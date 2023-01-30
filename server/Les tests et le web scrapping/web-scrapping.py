import requests
from bs4 import BeautifulSoup
import json

#function to allow only admin to scrap
#def web_scraping(user):
    #if not user.is_admin:
        #return "Error: only administrators are allowed to perform web scraping."
    
# Define the base URL
base_url = 'https://www.professeurparticulier.com'

# Define the URL of the first page
url = 'https://www.professeurparticulier.com/cours-particuliers/15-aide_aux_devoirs_soutien_scolaire/?fbclid=IwAR1oB70r5xIxDyL9rL6ax9qoBt4_VnYZP277kqWzTvZ1GqxhWcEoslbg3LU'

# Store the data in a list of dictionaries
data = []
    
i=0 #fix 2 pages to navigate
while url and i<2:
        r = requests.get(url)
        html_content = r.content.decode('ISO-8859-1')

        soup = BeautifulSoup(html_content, 'lxml')

        divs = soup.find_all('div', class_='anntotl2')


    
        for div in divs:
            item = {}
            for a in div.find_all('a'):
                item["title"] = a.text.strip()
            for h3 in div.find_all('h3'):
                item["description"] = h3.text.strip()
            data.append(item)
            
        # Find the link to the next page
            next_link = soup.find('a', {'class': 'noirot_sslien'})
            if next_link:
                url = base_url + next_link['href']
            else:
                url = None
        i+=1
    # Write the list of dictionaries to a file
with open("data.json", "w",encoding='utf-8') as file:
    json.dump(data, file,indent=4, ensure_ascii=False)


#return "Web scraping successful."



