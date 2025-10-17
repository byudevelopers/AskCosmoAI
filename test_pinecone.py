from pinecone import Pinecone
import json

with open("config.json", 'r') as f:
    config = json.load(f)
    api_key = config["API_KEY"]

pc = Pinecone(api_key=api_key)