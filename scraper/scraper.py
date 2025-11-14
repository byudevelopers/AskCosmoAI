"""
Simple University Web Scraper
Gets all meaningful text content while filtering out navigation and footer elements.
"""

from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeout
from unstructured.partition.html import partition_html
from typing import List, Dict, Any
import re
import json

def scrape_page(url: str) -> Dict[str, Any]:
    """
    Scrape a webpage and extract all meaningful content.
    
    Args:
        url: URL to scrape
        
    Returns:
        Dictionary with extracted text content
    """

    
    
    print(f"Scraping: {url}")
    
    # Step 1: Render the page with Playwright (handles JavaScript)
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        # Block images and other resources for speed
        page.route(
            "**/*.{png,jpg,jpeg,gif,svg,mp4,mp3,webm,woff,woff2}",
            lambda route: route.abort()
        )
        
        try:
            # Load the page
            page.goto(url, wait_until='load', timeout=15000)
            page.wait_for_timeout(2000)  # Wait for JS to render
            html = page.content()
        except PlaywrightTimeout:
            # Fallback to faster loading
            page.goto(url, wait_until='domcontentloaded', timeout=10000)
            page.wait_for_timeout(3000)
            html = page.content()
        finally:
            browser.close()
    
    print(f"✓ Page rendered ({len(html)} bytes)")
    
    # Step 2: Parse with Unstructured.io
    elements = partition_html(text=html)
    print(f"✓ Found {len(elements)} elements")
    
    # Step 3: Filter out navigation and footer content
    filtered_content = []
    
    # Common navigation/footer indicators to skip
    skip_categories = {'Header', 'Footer'}
    skip_keywords = [
        'cookie', 'privacy policy', 'terms of service', 'copyright ©',
        'all rights reserved', 'site map',
        'navigation', 'menu', 'search', 'login', 'sign in'
    ]
    
    for element in elements:
        text = element.text.strip()
        
        if not text:
            continue
        
        # Skip elements in navigation/footer categories
        if element.category in skip_categories:
            continue
        
        # # Skip very short text (likely navigation items)
        # if len(text) < 15:
        #     continue
        
        # Skip if text contains common footer/nav keywords
        text_lower = text.lower()
        if any(keyword in text_lower for keyword in skip_keywords):
            # Only skip if the text is short (< 100 chars)
            # Longer text might legitimately contain these words
            if len(text) < 100:
                continue
        
        filtered_content.append({
            'type': element.category,
            'text': text
        })
    
    print(f"✓ Filtered to {len(filtered_content)} content elements")
    
    # Step 4: Organize results
    result = {
        'url': url,
        'elements': filtered_content,
        'full_text': '\n\n'.join([item['text'] for item in filtered_content]),
        'total_elements': len(filtered_content)
    }
    
    return result, elements


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

def extract_structured_content(elements):
    """Extract content with relationships preserved."""
    
    # 1. Render and parse (your existing code)
    
    # 2. Group by sections
    sections = []
    current_section = {'heading': None, 'content': []}
    
    for element in elements:
        text = element.text.strip()
        if not text or len(text) < 15:
            continue
        
        if element.category == "Title":
            # Save previous section
            if current_section['content']:
                sections.append(current_section)
            # Start new section
            current_section = {
                'heading': text,
                'content': []
            }
        else:
            # Detect special patterns
            content_item = {'text': text, 'type': element.category}
            
            # Check if it's a date list
            if re.search(r'[A-Z][a-z]+\s+\d{1,2},\s+\d{4}', text):
                dates = parse_calendar_dates(text)
                if dates:
                    content_item['parsed_dates'] = dates
            
            current_section['content'].append(content_item)
    
    # Don't forget last section
    if current_section['content']:
        sections.append(current_section)
    
    return sections

if __name__ == "__main__":
    # Test with a single URL
    test_url = "https://clubs.byu.edu/link/club/18295873486205634"
    #test_url = "https://access.byu.edu/learning-disabilities" <--- doesn't work because all body text is hidden and has to be manually revealed :/
    #test_url = "https://enrollment.byu.edu/admissions/act-sat-test-scores"
    #test_url = "https://academiccalendar.byu.edu/2025-calendar-list-view"
    #test_url = "https://conferences.byu.edu/home"
    #test_url = "https://cougarcash.byu.edu"
    try:
        result, elements = scrape_page(test_url)
        
        print("\n" + "="*60)
        print("EXTRACTED CONTENT")
        print("="*60)
        
        # Show element breakdown
        element_types = {}
        for item in result['elements']:
            elem_type = item['type']
            element_types[elem_type] = element_types.get(elem_type, 0) + 1
        
        print(f"\nElement breakdown:")
        for elem_type, count in element_types.items():
            print(f"  {elem_type}: {count}")
        
        # Show first few elements
        print(f"\nFirst 5 elements:")
        for i, item in enumerate(result['elements'][:5], 1):
            print(f"\n{i}. [{item['type']}]")
            print(f"   {item['text'][:200]}{'...' if len(item['text']) > 200 else ''}")
        
        # Show full text preview
        print(f"\n{'='*60}")
        print("FULL TEXT PREVIEW (first 1000 chars)")
        print("="*60)
        print(result['full_text'][:1000])
        
        # Save to file
        output_file = "scraped_content.txt"
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(f"URL: {result['url']}\n")
            f.write(f"Total elements: {result['total_elements']}\n")
            f.write("="*60 + "\n\n")
            f.write(result['full_text'])
        
        print(f"\n✓ Full content saved to: {output_file}")

        #my code
        sections = extract_structured_content(elements)
        print(sections)
        with open("scraped_data.json", 'a') as f:
            json.dump(sections, f, indent=2)
        
    except Exception as e:
        print(f"\n✗ Error: {e}")
        import traceback
        traceback.print_exc()
    
    # Example: Scrape multiple pages
    # urls = [
    #     "https://clubs.byu.edu/link/club/18295873486205634",
    #     "https://example.edu/faculty/profile1",
    #     "https://example.edu/faculty/profile2"
    # ]
    # results = scrape_multiple_pages(urls)