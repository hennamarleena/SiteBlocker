# SiteBlocker

## Projektista
- Chrome-plugari, jolla voit estää haluamasi verkkosivustot

## Ominaisuudet (tulossa):
- Lisää estettäviä sivuja: Syötä verkkosivun URL ja lisää se listalle.
- Blokkaus-toiminnallisuus: Sivut, jotka on lisätty listalle, estetään käyttämällä chrome.declarativeNetRequest -API:a
- Poista estettyjä sivuja estolistalta
- Blokkaa nykyinen välilehti yhdellä klikkauksella
- Asynkroninen tallennus chrome.storage.local-tallennustilassa, joka on optimoitu Chrome-laajennuksille.

**Tällä hetkellä toimii:**
- Lisää sivu: Kirjoita URL ja lisää se listalle.
- Syötetyt sivut listanäkymässä
- Blokkaa nykyinen välilehti: Lisää aktiivisen välilehden URL estettyjen listalle.
- Poista sivu: Poista sivu estolistalta ja tallennuksesta.
- Ei blokkaa vielä mitään

## Asennus:
- lataa zip
- avaa Chrome -> hallinnoi laajennuksia -> kehittäjätila päälle -> lataa pakkaamaton