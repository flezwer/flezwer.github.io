# flezwer.github.io

Website for [Abyss Launcher](https://github.com/flezwer/Abyss-Launcher), a free Minecraft: Java Edition launcher for Windows.

Plain HTML, CSS and JavaScript. No build step, so GitHub Pages serves the files as they are.

## Structure

- `index.html`: the page (English content by default)
- `assets/js/i18n.js`: all text in 7 languages (Latino, Español, English, Italiano, Français, Deutsch, Русский)
- `assets/js/site.js`: command palette (Ctrl+K), language menu, accent colors, particles, latest-release lookup
- `assets/css/site.css`: styles, using the launcher's own colors
- `assets/img/`: launcher screenshots (real interface, demo profile) and icons

## Updating

- **New release:** nothing to do. The download button reads the latest release of `flezwer/Abyss-Launcher` from the GitHub API and links its `.exe`. The version, size and date in the HTML are only a fallback.
- **Text:** edit `assets/js/i18n.js`. English is also written into `index.html` for visitors without JavaScript, so change it in both places.
- **Screenshots:** replace the `.webp` files in `assets/img/` and keep the same names.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

---

Not an official Minecraft product. Not approved by or associated with Mojang or Microsoft.
