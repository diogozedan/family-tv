# family-tv

Living-room TV dashboard: Family calendar (Today, then Coming up), a rotating photo tile, clock, and a 7-day Pelham forecast with "feels like" temperatures.

- `index.html` is the whole page, served by GitHub Pages.
- Calendar data comes from a private Google Apps Script web app and needs an access key passed as `?k=…`.
  The key is not stored in this repo; without it the page shows no calendar.
- Photos come from a Google Drive folder named "Family TV Photos", listed by the Apps Script
  (`apps-script/Photos.gs`, added alongside Code.gs). They change every 15 seconds in random order.
- Weather comes straight from [Open-Meteo](https://open-meteo.com/) (free, no key).

Open on the TV: `https://diogozedan.github.io/family-tv/?k=<key>`
