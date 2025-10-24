import requests

url = "https://academiccalendar.byu.edu/2025-calendar-list-view"
response = requests.get(url)

print(response.text)

with open("html.txt", 'w') as f:
    f.write(response.text)