# Canonical Release State — 2026-09-18

This repository defines the current public-source state for **Manipulation — The Fool and the Wise** and **The Reasoning Library**. The Structure of Life public source is maintained in `Joenasriani/structure-of-life-book`.

## Canonical public products

### Manipulation — The Fool and the Wise
- Edition: **First Study Edition — September 2026**
- Public descriptor: **Independent Source-Mapped Study Edition**
- Canonical design: **locked dark editorial confrontation/keyhole art direction + current SEO/accessibility/publication corrections**
- Canonical price: **USD 23.33**
- Canonical page: `https://manipulation-book.vercel.app/`
- Production project: `manipulation-book` (`prj_LM2IRHgaBTjJ397TBzNux308FuEw`)
- Production deployment: `dpl_Fy9jATJrfXjQKqEAy4RN33xCLnqx`
- Public source: `/index.html`, `/styles.css`, `/toprail.css`, `/api/`, `/sample.html`, `/methodology.html`, `/terms.html`
- Canonical publication manifest: `/MANIPULATION_RELEASE_MANIFEST.md`

### The Structure of Life — The Structure of Reasoning
- Canonical source repository: `Joenasriani/structure-of-life-book`
- Canonical price: **USD 23.33**
- Canonical page: `https://the-structure-of-life.vercel.app/`
- Production deployment: `dpl_BJNGu3nzyhqxuSxmtSoGqrJVju8c`

### The Reasoning Library
- Public source: `/store-v3/`
- Public page: `https://reasoning-library.vercel.app/`
- Production deployment: `dpl_7uctYsrFaXi6zDxctt72ixMKTjX1`

## Canonical publication terminology

Use these object names consistently:

- Main Book
- EPUB
- Study Workbook
- Research Atlas
- Source Register
- Structured Knowledge Register
- AI Reasoning Framework
- Free Sample
- Buyer Edition Package
- Buyer Guide
- Release Manifest

See `/PUBLISHING_RELEASE_STANDARD.md`.

## Canonical cover

Canonical cover asset: `assets/cover.jpg` — Git blob `a7134dfa144c50493a4e7495772703bc5f3ede19` (restored clean historical artwork; no alternate public cover asset).

## Buyer delivery rule

A commercial release should expose the Main Book PDF and EPUB directly to the buyer for immediate reading and also provide the complete Buyer Edition ZIP containing the canonical book, study, research, machine-readable, AI and terms layers. The ZIP is the complete archival bundle; it is not the only reading path.

## Canonical identity rule

Anything that contradicts this state is historical or superseded. Historical filenames or deployment labels do not determine canonical status. Canonical status requires the current manifest and release audit.

**USD 23.33** is the canonical Manipulation price.

## Public/private rule

The public repository may contain the website, methodology, public sample, selected source material, metadata and release documentation. Full paid publication files and the buyer archive must remain outside publicly enumerable web paths.

## Deployment verification — 2026-09-18

The public deployment drift has been repaired.

### Manipulation
The single canonical Manipulation site is live and production-ready at the canonical URL. Verified HTTP 200:
- `/`
- `/sample`
- `/methodology`
- `/terms`
- `/sitemap.xml`
- `/robots.txt`

Retired Manipulation addresses are redirect-only compatibility routes to `https://manipulation-book.vercel.app/`; they are not independent publication versions.

### The Structure of Life
Canonical source is live at the canonical URL. Verified HTTP 200:
- `/`
- `/sample`
- `/methodology`
- `/terms`
- `/sitemap.xml`
- `/robots.txt`

The obsolete **5 FREE AI FRAMEWORKS** live copy is no longer the production root.

### The Reasoning Library
Current `store-v3` source is deployed and the canonical store root, sitemap and robots return HTTP 200. Store sitemap lastmod is 2026-09-17.

## Remaining commercial-release boundary

Public-source and production synchronization are now complete. Commercial BOOK LOCK still additionally requires the exact paid buyer binaries, final per-file hashes, final Buyer Edition archive hashes and an end-to-end successful payment-to-delivery/access test.

## Blocker-resilience rule

Critical navigation, book links and purchase links must remain ordinary first-party HTML anchors and must not depend on analytics, advertising scripts or trackers. Avoid naming critical visible elements or asset paths with advertising/filter-list vocabulary such as `ad`, `ads`, `advert`, `banner`, `sponsor`, `promo`, `tracker` or `pixel`.
