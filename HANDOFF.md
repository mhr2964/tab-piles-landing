# HANDOFF — tab-piles-landing

Static landing page for tabpiles.app. Single-page sales site + legal stubs. No backend, no build step.

```yaml
last-model: claude-opus-4-7
last-session: 2026-05-23
state: green-pending-deploy
```

## Next action — user-blocks

1. **Connect a Cloudflare account** to a git remote for this repo. Pages → Create project → Connect to git → output dir `src/`, no build command. (CF Pages dashboard at <https://dash.cloudflare.com/>.)
2. **Buy a domain** (e.g. `tabpiles.app`) and point it at the Pages deployment. CF Registrar is fine; Namecheap/Porkbun also fine.
3. **Create Lemon Squeezy products.** Three variants: `tab-piles-monthly` ($5/mo), `tab-piles-yearly` ($40/yr), `tab-piles-lifetime` ($79 one-time). Enable the "License Keys" add-on on each. Copy each checkout URL.
4. **Wire the placeholders in `src/main.js`:**
   - `CWS_URL` — set to the Chrome Web Store URL after CWS approval. Until then it's a 404, no harm.
   - `LS_OVERLAY_URLS.monthly/yearly/lifetime` — paste the per-variant Lemon Squeezy checkout URLs.
5. **Set the "Last updated" date** in `src/legal/privacy.html` and `src/legal/terms.html` (search for `USER: set on first publish`).
6. **Pick a support email.** Currently `support@tabpiles.app` everywhere — set up email forwarding for the domain (CF Email Routing is free) before any user hits this.

## Local preview

No build step. Quickest options:
- `python -m http.server -d src 8787` then open <http://localhost:8787>
- `npx serve src` (one-time `npm i -g serve` or run via npx)

## Structure

```
src/
  index.html       — single-page landing (hero, features, pricing, privacy strip, footer)
  styles.css       — design system, charcoal + amber, responsive at 900px and 540px
  main.js          — wires CWS link + Lemon Squeezy overlay buttons + footer year
  icon.svg         — same mark as extension (three offset cards, folded corner)
  screenshots/     — 4 screenshots from the extension, copied from
                     Projects/tab-piles/listing/screenshots/
  legal/
    privacy.html
    terms.html
```

## Design notes

- Brand palette comes from the extension: charcoal `#1F2933`, amber `#F59E0B`. Both rendered via CSS custom properties (`--ink`, `--amber`) — change once, change everywhere.
- Pricing card layout uses 4 columns on desktop, 2 columns ≤ 900px, 1 column ≤ 540px.
- Hero is a two-column grid that collapses to one column on narrow screens. The hero screenshot uses the same `cws-1-hero.png` as the CWS listing.
- The "Pro Lifetime" card is visually featured (amber border, lifted, "Best value" badge) because it's the offer with the lowest churn risk and highest per-customer value.
- No carousel, no testimonials, no FAQ. Add these only after launch reveals which questions people actually ask.

## Privacy/legal stubs

`privacy.html` and `terms.html` are written prose, not lorem ipsum. They reflect the actual data flows (free tier sends nothing, Pro tier syncs only between user devices via our Workers endpoint, payments via Lemon Squeezy). Have a lawyer review before going live with paid traffic.

## Traps

- **`data-cws-url` placeholder** lives in `main.js` — until you set the real CWS URL, all "Add to Chrome" buttons go nowhere. Worth a banner if you launch the landing page before CWS approval.
- **Lemon Squeezy overlay** depends on `https://app.lemonsqueezy.com/js/lemon.js` being loaded. If the user's network blocks that, the button links still work — they fall back to opening the checkout in a new tab. The fallback is automatic, no code change needed.
- **Open Graph image** points at `/screenshots/cws-1-hero.png`. Twitter/iMessage previews will render at the 1280x800 aspect — fine.

## Do not touch

- `screenshots/*.png` — these are mirrored from the extension listing. Regenerate at the extension end (run `extension/scripts/normalize-screenshots.mjs` after fresh captures), then copy back.

---

When the landing is live, paid checkouts are wired, and the extension is in CWS review, **delete this file**.
