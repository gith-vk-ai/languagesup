# LanguagesUp

Pre-sell web pro languagesup.com: landing page → 6krokový kvíz → personalizované výsledky → affiliate odkaz.
Next.js 16 (App Router, TypeScript, Tailwind 4) exportovaný staticky do `out/` a servírovaný přes Cloudflare Workers static assets.

## Kde co upravit

| Co | Soubor |
| --- | --- |
| Affiliate odkaz (CJ / Rocket Languages), sub-ID | `src/config/affiliate.ts` |
| Meta Pixel / GA4 / GTM ID, consent banner | `src/config/tracking.ts` |
| Otázky a odpovědi kvízu | `src/config/quiz.ts` |
| Texty výsledků (personalizace) | `src/lib/personalize.ts` |
| Kontaktní e-mail, datum právních textů | `src/config/site.ts` |
| Hlavní stránka | `src/app/page.tsx` |

### Affiliate
Dokud je `liveUrl` prázdné, CTA vede na neaffiliate `previewUrl`. Po vložení schváleného CJ odkazu do `liveUrl` se automaticky používá ten.
`NEXT_PUBLIC_AFFILIATE_MODE=preview` vynutí preview i při vyplněném `liveUrl` (např. pro testovací build).
Sub-ID (`subId.param`) zapni až podle formátu odkazu, který CJ schválí.

### Analytika
Události: `PageView`, `QuizStart`, `QuizStepViewed`, `QuizAnswered`, `QuizCompleted`, `ResultsViewed`, `OutboundAffiliateClick`.
Každá nese zachycené UTM / `campaign_id` / `adset_id` / `ad_id` / `fbclid` z první návštěvy v session.
GTM dostává názvy jak jsou (`dataLayer`), GA4 v snake_case (`quiz_answered`…), Meta jako `trackCustom`.
Žádná událost nákupu se neodesílá – prodeje potvrzuje jen reporting affiliate sítě.
Používej buď GTM, nebo GA4 přímo, ne obojí se stejnou GA4 property.

## Vývoj

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statický export do out/
npx wrangler dev   # lokálně servíruje out/ stejně jako Cloudflare
```

## Nasazení (Cloudflare Workers)

Cloudflare při každém pushu do `main` spustí `npx wrangler deploy`. Wrangler si podle `wrangler.jsonc` sám
spustí `npm run build` a nahraje `out/` – build command v dashboardu proto může zůstat prázdný.
Node verze pro build je v `.node-version`.

Každý push do `main` = nasazení na živý web.
