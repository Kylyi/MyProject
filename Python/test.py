html_doc = """
<html><head><title>The Dormouse's story</title></head>
<body>
<p class="title"><b>The Dormouse's story</b></p>

<p class="story">Once upon a time there were three little sisters; and their names were
<a href="http://example.com/elsie" class="sister" id="link1">Elsie</a>,
<a href="http://example.com/lacie" class="sister" id="link2">Lacie</a> and
<a href="http://example.com/tillie" class="sister" id="link3">Tillie</a>;
and they lived at the bottom of a well.</p>

<p class="story">...</p>
"""

def has_class_but_no_id(tag):
    return tag.has_attr('class') and not tag.has_attr('id')


from bs4 import BeautifulSoup
import re
import urllib2


r_test = urllib2.urlopen('http://zpravy.idnes.cz/archiv.aspx?idostrova=idnes')
soup = BeautifulSoup(r_test, 'lxml')
result = soup.find("div", class_ = "art").h3.a['href']

new_idnes = urllib2.urlopen(result)
r_test2 = BeautifulSoup(new_idnes, 'lxml')
result2 = r_test2.find("div", class_= "text")



print result2


