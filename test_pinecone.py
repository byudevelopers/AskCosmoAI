"""THIS IS A SAMPLE PINECONE DATABASE WITH DENSE VECTORS USING MOCK DATA"""
from pinecone import Pinecone
import time
import json

with open("config.json", 'r') as f:
    config = json.load(f)
    api_key = config["API_KEY"]
    data = config["SAMPLE_DATA"]

pc = Pinecone(api_key=api_key)

#indexes are essentially the database
index_name = "test-index"

#create the index database
if not pc.has_index(index_name):
    pc.create_index_for_model(
        name=index_name,
        cloud="aws",
        region="us-east-1", 
        embed={
            "model":"multilingual-e5-large",
            #chunk_text is the field that gets converted to vector embeddings
            "field_map":{"text": "chunk_text"} #this is the name of the field in the source documentation that contains the data for embedding
        }
    )

#create dense index (captures more meaning from text)
dense_index = pc.Index(index_name)
print(dense_index.describe_index_stats())

#========== upsert (upload) records into a namespace ==========
"""namespaces are sort of like the columns or collections within the database. We'll pobably only use a single namespace for AskCosmo"""
dense_index.upsert_records("namespace-0", data) #NOTE: look into upsert_batch (may be faster for uploading a lot of data but I'm not sure)
print("\nuploading data...")
time.sleep(10)

#view stats for the index
stats = dense_index.describe_index_stats()
print("\n" + stats)

#========== sample query that returns top 3 most relevant text in database ==========
# Define the query
query = "how many nuerons does the brain have"

# Search the dense index
results = dense_index.search(
    namespace="namespace-0",
    query={
        "top_k": 3,
        "inputs": {
            'text': query
        }
    }
)

# Print the results
print("\n")
for hit in results['result']['hits']:
        print(f"id: {hit['_id']:<5} | score: {round(hit['_score'], 2):<5} | category: {hit['fields']['category']:<10} | text: {hit['fields']['chunk_text']:<50}")


"""
likely needed data fields for webscraped data:
scraped-text
url
date-scraped
index number (some sort of unique id)
website-category (like Dining, CS, Admissions, etc; taken from html headers)

example from chatGPT. Does NOT have to be exactly like this:

{
  "id": "byu-admissions-00123",
  "url": "https://admissions.byu.edu/undergraduate/application-deadlines",
  "website_category": "Admissions",
  "title": "Undergraduate Application Deadlines",
  "scraped_text": "Applications for Fall semester are due by December 1 for early consideration and February 1 for final submission. International students must complete the TOEFL by the same deadline...",
  "date_scraped": "2025-10-16T18:35:00Z",
  "content_structure": {
    "headings": [
      "Application Deadlines",
      "International Applicants",
      "Late Submissions"
    ],
    "html_tags": ["h2", "p", "ul"]
  },
  "source_site": "byu.edu",
  "chunk_index": null,
  "metadata": {
    "language": "en",
    "tokens": 1250,
    "scrape_method": "beautifulsoup-cleaned",
    "page_type": "static",
    "priority": "high"
  }
}
"""

