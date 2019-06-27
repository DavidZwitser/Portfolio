import requests
from bs4 import BeautifulSoup

r = requests.get('https://www.instagram.com/p/BtTiF03FhXM/')

soup = BeautifulSoup(r.text, 'html.parser')

print(r.text)

links = soup.find_all("a", href=True)

for i in range(len(links)):
    print(i)
    