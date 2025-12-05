import json
from pathlib import Path
from scraper import scrape_page  # <-- import your scraper
from typing import List, Dict, Any

def load_urls_from_crawler() -> List[str]:
    """
    Load the link_counts.json file produced by the crawler.

    Returns:
        A list of URLs extracted from the JSON file.
    """
    crawler_output = Path("../../crawler/Webcrawler/byucrawl/out/link_counts.json")  # relative path

    if not crawler_output.exists():
        raise FileNotFoundError("Could not find crawler output at ../crawler/out/link_counts.json")

    # Load URL → count dictionary
    with open(crawler_output, "r", encoding="utf-8") as f:
        link_counts = json.load(f)

    # Extract the URLs (keys)
    urls = list(link_counts.keys())

    print(f"Loaded {len(urls)} URLs from crawler output.")
    return urls


def process_urls(urls: List[str]) -> List[Dict[str, Any]]:
    """
    Send each URL to the Playwright scraper.

    Args:
        urls: List of URLs to scrape.

    Returns:
        A list of JSON-serializable dictionaries returned by scrape_page().
    """
    results = []

    for i, url in enumerate(urls, 1):
        print(f"[{i}/{len(urls)}] Scraping {url}...")
        try:
            result, _elements = scrape_page(url)  
            # scrape_page() returns (result, elements)
            # elements is the raw unstructured docs but we don't store it yet
            results.append(result)
        except Exception as e:
            print(f"✗ Error scraping {url}: {e}")
            results.append({
                "url": url,
                "error": str(e),
                "elements": [],
                "full_text": "",
                "total_elements": 0
            })

    return results


def save_pipeline_output(results: List[Dict[str, Any]]) -> None:
    """
    Save the list of scraped page results to a JSON file.

    Args:
        results: List of dictionaries describing each scraped page.
    """

    output_path = Path("scraped_pages.json")

    # Write all results into a single JSON file #
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    print(f"\n✓ Saved {len(results)} scraped records to {output_path}")



if __name__ == "__main__":
    urls = load_urls_from_crawler()
    results = process_urls(urls)
    save_pipeline_output(results)