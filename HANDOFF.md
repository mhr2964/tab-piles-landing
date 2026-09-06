# HANDOFF — tab-piles-landing

Static landing page hosted at the free `tabpiles.pages.dev` Cloudflare Pages subdomain. Single-page sales site + legal stubs. No backend, no build step. Swap to a custom domain later by re-pointing DNS — no code changes needed.

```yaml
last-model: claude-sonnet-5
last-session: 2026-09-06
state: yellow
```

## Next action — user-block (CWS + take LS store live)

**Live now:** deployed via `wrangler pages deploy` (direct upload, not git-connected) to `https://tabpiles.pages.dev`. Legal page dates are set. `LS_OVERLAY_URLS` in `src/main.js` point at the real Lemon Squeezy checkout links (monthly/yearly/lifetime). Buy buttons will render the LS overlay correctly — but the LS store itself is still in test mode (see `tab-piles-worker/HANDOFF.md`), so checkouts won't charge real money until that's resolved.

Remaining:

1. **`CWS_URL`** — still a placeholder until the extension clears Chrome Web Store review (Day 5+ per `LAUNCH.md`).
2. **Pick a support email.** Default is `tabpiles.support@gmail.com` everywhere. Three options:
   - **Free (default).** Sign up for `tabpiles.support@gmail.com` directly. Use as-is.
   - **Mid.** If/when you buy a real domain, switch to `support@<domain>` via CF Email Routing (free with domain). Search-replace the address across `src/`.
   - **High.** Custom helpdesk (Helpscout / Pylon / Linear Support). Not needed pre-launch.

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

- **Deployed via direct upload, not git-connected Pages.** `git push` to this repo will NOT auto-deploy. Re-run `npx wrangler pages deploy src --project-name=tabpiles` after any `src/` change. (Connecting Pages to the GitHub repo for auto-deploy is a dashboard-only click-through — do that later if the manual redeploy gets annoying.)
- **`data-cws-url` placeholder** lives in `main.js` — until you set the real CWS URL, all "Add to Chrome" buttons go nowhere. Worth a banner if you launch the landing page before CWS approval.
- **Lemon Squeezy overlay** depends on `https://app.lemonsqueezy.com/js/lemon.js` being loaded. If the user's network blocks that, the button links still work — they fall back to opening the checkout in a new tab. The fallback is automatic, no code change needed.
- **Open Graph image** points at `/screenshots/cws-1-hero.png`. Twitter/iMessage previews will render at the 1280x800 aspect — fine.

## Do not touch

- `screenshots/*.png` — these are mirrored from the extension listing. Regenerate at the extension end (run `extension/scripts/normalize-screenshots.mjs` after fresh captures), then copy back.

---

When the landing is live, paid checkouts are wired, and the extension is in CWS review, **delete this file**.
