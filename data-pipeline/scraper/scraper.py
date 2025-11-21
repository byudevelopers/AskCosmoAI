"""
Simple University Web Scraper
Gets all meaningful text content while filtering out navigation and footer elements.
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from unstructured.partition.html import partition_html
from typing import List, Dict, Any
import re
import datetime
import json

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from unstructured.partition.html import partition_html

def scrape_page(url: str) -> dict:
    """
    Minimal scraper for the MVP RAG system.
    Extracts page title + full plaintext from rendered HTML.
    Performs light filtering but NO structured metadata merging.
    """

    print(f"Scraping: {url}")

    # === STEP 1 — Render Page with Playwright ===
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Block heavy assets for speed
        page.route("**/*.{png,jpg,jpeg,gif,svg,mp4,mp3,webm,woff,woff2}",
                   lambda route: route.abort())

        try:
            page.goto(url, wait_until='load', timeout=15000)
            page.wait_for_timeout(2000)
            html = page.content()
            raw_title = page.title()
        except PlaywrightTimeout:
            page.goto(url, wait_until='domcontentloaded', timeout=10000)
            page.wait_for_timeout(2000)
            html = page.content()
            raw_title = None
        finally:
            browser.close()

    print("✓ Page rendered")


    # === STEP 2 — Extract Text with Unstructured ===
    elements = partition_html(text=html)

    # Extract the club name from the first Unstructured Title element
    element_title = next(
        (el.text.strip() for el in elements if el.__class__.__name__ == "Title"),
        None
    )

    # Choose the real page title
    title = element_title or raw_title

    # === STEP 3 — Light Filtering for Navigation/Footer Junk ===
    skip_keywords = [
        "cookie", "privacy policy", "terms of service", "all rights reserved",
        "login", "sign in", "newsletter", "unsubscribe"
    ]

    cleaned_parts = []
    for el in elements:
        if not hasattr(el, "text"):
            continue

        text = el.text.strip()
        if not text:
            continue

        # Skip extremely short nav items (e.g., "Home", "Menu")
        if len(text) < 3:
            continue

        # Skip footer/nav based on keywords
        lower = text.lower()
        if any(k in lower for k in skip_keywords):
            if len(text) < 200:  # ignore huge blocks
                continue

        cleaned_parts.append(text)

    print(f"✓ Extracted {len(cleaned_parts)} useful text blocks")

    # === STEP 4 — Combine Everything for RAG Embedding ===
    full_text = "\n\n".join(cleaned_parts)

    # === STEP 5 — Return Final JSON Object ===
    output =  {
        "url": url,
        "page_title": title,
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "full_text": full_text,
        "element_count": len(cleaned_parts)
    }


    # with open("scratch_code/scraped_result_2.json", "w") as f:
    #     json.dump(output, f, indent=2)

    return output


def scrape_multiple_pages(urls: List[str]) -> List[Dict[str, Any]]:
    """Scrape multiple pages."""
    results = []
    
    for i, url in enumerate(urls, 1):
        print(f"\n[{i}/{len(urls)}] Processing: {url}")
        try:
            result = scrape_page(url)
            results.append(result)
            print(f"✓ Success - extracted {result['total_elements']} elements")
        except Exception as e:
            print(f"✗ Error: {e}")
            results.append({
                'url': url,
                'error': str(e),
                'elements': [],
                'full_text': '',
                'total_elements': 0
            })
    
    return results

def get_scraped_data(url):
    try:
        result, elements = scrape_page(url)
        print("[DEBUG] DONE SCRAPING")
        print(type(result)) #dict
        print(type(elements)) #list
        
        return result

    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()

        return None
