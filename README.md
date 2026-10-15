# LanguagesUp

Statický web pro languagesup.com, hostovaný na Cloudflare Workers (static assets, konfigurace ve `wrangler.jsonc`, vyloučené soubory v `.assetsignore`).

## Struktura

- `index.html` – hlavní stránka
- `404.html` – stránka pro neexistující URL
- `css/style.css` – styly
- `js/main.js` – skripty

## Nasazení na Cloudflare

1. [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Import a repository** (Connect to Git).
2. Vyber repozitář `gith-vk-ai/languagesup`.
3. Build settings:
   - Build command: (prázdné)
   - Deploy command: `npx wrangler deploy`
   - Production branch: `main`
4. Po nasazení v **Settings → Domains & Routes** přidej `languagesup.com` a `www.languagesup.com` (doména musí mít DNS na Cloudflare).

Každý push do `main` = automatické nasazení na živý web.

## Vývoj

Otevřít `index.html` v prohlížeči, žádný build krok není potřeba.
