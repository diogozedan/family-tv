# family-tv

Living-room TV dashboard: Family calendar, clock, and a 7-day Pelham forecast with "feels like" temperatures.

- `index.html` is the whole page, served by GitHub Pages.
- Calendar data comes from a private Google Apps Script web app and needs an access key passed as `?k=…`.
  The key is not stored in this repo; without it the page shows no calendar.
- Weather comes straight from [Open-Meteo](https://open-meteo.com/) (free, no key).

Open on the TV: `https://diogozedan.github.io/family-tv/?k=<key>`
