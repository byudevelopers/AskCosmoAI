import json
from collections import Counter
from urllib.parse import urlparse

import scrapy
from scrapy import signals
from scrapy.linkextractors import LinkExtractor


class ByuSpider(scrapy.Spider):
    name = "byuspider"  # <- this is the name you'll use with `scrapy crawl`
    allowed_domains = ["byu.edu"]
    start_urls = ["https://www.byu.edu/a-z-index"]  # this is link the crawler will start from

    custom_settings = {
        "ROBOTSTXT_OBEY": True,
        "AUTOTHROTTLE_ENABLED": True,
        "AUTOTHROTTLE_START_DELAY": 0.5,
        "AUTOTHROTTLE_MAX_DELAY": 8.0,
        "DOWNLOAD_DELAY": 0.25,
        "CONCURRENT_REQUESTS": 8,
        "USER_AGENT": "byu-crawler (kdb82@byu.edu)",

        "DEPTH_LIMIT": 5,                 # go at most 5 links away from start_urls
        "DEPTH_PRIORITY": 1,              # prioritize shallow requests first (BFS)
        "SCHEDULER_DISK_QUEUE": "scrapy.squeues.PickleFifoDiskQueue",
        "SCHEDULER_MEMORY_QUEUE": "scrapy.squeues.FifoMemoryQueue",

        # (Optional) guardrails while testing
        "CLOSESPIDER_PAGECOUNT": 300,  # stop after N fetched pages
        # "LOG_LEVEL": "INFO",
    }

    _deny_ext = (
        r"\.(pdf|docx?|xlsx?|pptx?|zip|gz|rar|7z|mp3|mp4|avi|mov|wmv|mkv|jpg|jpeg|png|gif|svg|webp|ico)$"
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.counts = Counter()
        # LinkExtractor decides which links from each page we will follow
        self.extractor = LinkExtractor(
            allow_domains=self.allowed_domains,
            deny=(self._deny_ext,
                  r"/wp-json/",
                  r"/feed/",
                  r"/calendar/",
                  r"cas\.byu\.edu",
                  r"/cas/",
                  r"login"),
            unique=True,
        )

    @classmethod
    def from_crawler(cls, crawler, *args, **kwargs):
        spider = super().from_crawler(crawler, *args, **kwargs)
        crawler.signals.connect(spider._on_closed, signal=signals.spider_closed)
        return spider

    def parse(self, response):
        """Handle each downloaded page."""
        # Get the hostname of the current page, e.g. "cas.byu.edu" or "biology.byu.edu"
        host = urlparse(response.url).hostname or ""

        # If this is a CAS page, bail out early:
        # don't count it and don't follow any links from it.
        if host == "cas.byu.edu" or host.endswith(".cas.byu.edu"):
            return

        # Count that we visited this URL
        self.counts[response.url] += 1

        # Follow more links from this page
        for link in self.extractor.extract_links(response):
            url = link.url
            host = urlparse(url).hostname or ""
            if host.endswith("byu.edu"):
                yield scrapy.Request(url, callback=self.parse)

    def _on_closed(self, reason):
        """When the crawl is done, write counts out to JSON."""
        from pathlib import Path
        Path("out").mkdir(parents=True, exist_ok=True)
        with open("out/link_counts.json", "w", encoding="utf-8") as f:
            json.dump(self.counts, f, indent=2, ensure_ascii=False)
        self.logger.info("Wrote link counts to out/link_counts.json")
