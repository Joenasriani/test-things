# Canonical Release — 2026-09-16

This repository has one current public release state.

## Canonical public products

1. **Manipulation — The Fool and the Wise**
   - Public source: `/index.html`, `/styles.css`, `/toprail.css`, `/api/`, `/sample.html`, `/methodology.html`
   - Canonical price: **USD 23.33**
   - Public page: https://manipulation-the-fool-and-the-wise-two.vercel.app/

2. **The Structure of Life — The Structure of Reasoning**
   - Canonical source repository: `Joenasriani/structure-of-life-book`
   - Canonical price: **USD 23.33**
   - Public page: https://the-structure-of-life.vercel.app/

3. **The Reasoning Library**
   - Public source: `/store-v3/`
   - Public page: https://reasoning-library.vercel.app/

## Store interaction contract

- Large cover and title open the dedicated book page.
- The visible price/purchase strip opens the purchase destination directly.
- Dedicated book pages retain a visible authored route back to The Reasoning Library.
- Exactly two books are published in the current catalogue.

## Version rule

Anything that contradicts this release state is historical or superseded. In particular:

- **USD 19** is obsolete for Manipulation.
- Detached or marketing-facing **“2026 Research Update”** claims are not part of the current Manipulation landing-page positioning.
- Older store versions where the Structure price line says **VIEW BOOK** instead of purchasing directly are superseded.

## Blocker-resilience rule

Critical navigation, book links and purchase links are ordinary first-party HTML anchors and do not depend on analytics, advertising scripts or trackers. Avoid naming critical visible elements or asset paths with advertising/filter-list vocabulary such as `ad`, `ads`, `advert`, `banner`, `sponsor`, `promo`, `tracker` or `pixel`.

A deployment is not considered current until its canonical Vercel URL has been fetched and verified against this release state.
