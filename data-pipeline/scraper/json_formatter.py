import json
from scraper import get_scraped_data

def get_json(url):
    """Formats raw data from webscraping into pinconeDB compatible JSON"""
    raw_data = get_scraped_data(url)
    pinecone_data = []

    for i in range(len(raw_data["elements"])):
        id = i
        text = raw_data["elements"][i]["text"]
        data_chunk = {
            "url": url,
            "_id": id,
            "chunk_text": text
        }

        pinecone_data.append(data_chunk)
        #   print(pinecone_data)
    return pinecone_data

#testing
get_json("https://clubs.byu.edu/link/club/18295873486205892")