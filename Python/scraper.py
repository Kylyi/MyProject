from lxml import html
import requests
import urllib2
from bs4 import BeautifulSoup


# Zdroje
idnes = 'http://zpravy.idnes.cz/archiv.aspx?idostrova=idnes'
novinky = 'https://www.novinky.cz/stalo-se/'
test = 'http://econpy.pythonanywhere.com/ex/001.html'


# Requesty na jednotlive zdroje
r_idnes = urllib2.urlopen(idnes)
r_test = urllib2.urlopen(test)


# html elementy zdroju
tree_idnes = BeautifulSoup(r_idnes, 'html.parser')
tree_test = BeautifulSoup(r_test, 'html.parser')

# obsah, ktery obsahuje dulezite prvky
clanek = tree_idnes.find("div", class_ = "art").h3.a.string



print clanek