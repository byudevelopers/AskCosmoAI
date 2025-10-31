import requests
from bs4 import BeautifulSoup #beautifulsoup
import json

url = "https://academiccalendar.byu.edu/2025-calendar-list-view"
response = requests.get(url)

#print(response.text)

# with open("html.txt", 'w') as f:
#     f.write(response.text)

soup = BeautifulSoup(response.text, "html.parser")

#gets raw table text
table_data_raw = soup.find("meta", attrs={"name":"twitter:description"})
table_data = table_data_raw["content"]
#print(table_data["content"])

#gets actual table
table = soup.find("div", attrs={"class":"RichTextArticleBody-body"})
rows = table.find_all("tr")

calendar_events = []
for row in rows:
    pair = {}

    text = row.get_text(strip=True)
    print("\n======================TEXT======================")
    print(text)
    data = row.find_all("td")
    calendar_date = data[0]
    event = data[1]
    print("\n======================DATE======================")
    print(calendar_date.get_text(strip=True))
    print("\n======================EVENT======================")
    print(event.get_text(strip=True))

    #pair[calendar_date.get_text(strip=True)] = event.get_text(strip=True)
    date_pair = f"{calendar_date.get_text(strip=True)}: {event.get_text(strip=True)}"
    calendar_events.append(date_pair)

#print(table.decode_contents())

print(calendar_events)

json_list = []
id = 0
for event in calendar_events:
    json_object = {
        "_id": str(id),
        "_url": url,
        "chunk_text": event,
    }
    json_list.append(json_object)
    id += 1

print(json_list)

with open("calendar_output.json", "w", encoding="utf-8") as f:
    json.dump(json_list, f, indent=4, ensure_ascii=False)