from readability import Document
import requests
from bs4 import BeautifulSoup

url = "https://enrollment.byu.edu/admissions/transfer-applicants"
response = requests.get(url)

doc = Document(response.text)

cleaned_html = doc.summary()
title = doc.title()
print(title)

soup = BeautifulSoup(cleaned_html, 'html.parser')
main_text = soup.get_text(separator=' ', strip=True)

print(main_text)