# Canonical Release State — 2026-09-17

This repository defines the current public-source state for **Manipulation — The Fool and the Wise** and **The Reasoning Library**. The Structure of Life public source is maintained in `Joenasriani/structure-of-life-book`.

## Canonical public products

### Manipulation — The Fool and the Wise
- Edition: **First Study Edition — September 2026**
- Public descriptor: **Independent Source-Mapped Study Edition**
- Canonical price: **USD 23.33**
- Canonical page: `https://manipulation-the-fool-and-the-wise-two.vercel.app/`
- Public source: `/index.html`, `/styles.css`, `/toprail.css`, `/api/`, `/sample.html`, `/methodology.html`
- Canonical publication manifest: `/MANIPULATION_RELEASE_MANIFEST.md`

### The Structure of Life — The Structure of Reasoning
- Canonical source repository: `Joenasriani/structure-of-life-book`
- Canonical price: **USD 23.33**
- Canonical page: `https://the-structure-of-life.vercel.app/`

### The Reasoning Library
- Public source: `/store-v3/`
- Public page: `https://reasoning-library.vercel.app/`

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
- Release Manifest

See `/PUBLISHING_RELEASE_STANDARD.md`.

## Version rule

Anything that contradicts this state is historical or superseded. A filename containing `FINAL`, `latest`, `(1)`, `v2`, `v3`, or `ULTIMATE` is not sufficient evidence of canonical status. Canonical status requires an explicit manifest entry and release audit.

The historical **$19** Manipulation offer is obsolete. **USD 23.33** is the only current Manipulation price.

## Public/private rule

The public repository may contain the website, methodology, public sample, selected source material, metadata and release documentation. Full paid publication files and the buyer archive must remain outside publicly enumerable web paths.

## Deployment rule

A GitHub commit is not considered live merely because it is canonical source. A production release is current only after:

1. the intended canonical source is deployed to the correct Vercel project;
2. the canonical URL is fetched and compared against the source;
3. sample, methodology, sitemap and checkout routes are tested;
4. payment-to-delivery is tested separately.

As of the 2026-09-17 reconciliation, **Vercel production is not synchronized with this repository's current Manipulation source**. The earlier production-sync workflow failed before deployment because its Vercel credential was unavailable. This must remain a release blocker until production is re-verified.

## Blocker-resilience rule

Critical navigation, book links and purchase links must remain ordinary first-party HTML anchors and must not depend on analytics, advertising scripts or trackers. Avoid naming critical visible elements or asset paths with advertising/filter-list vocabulary such as `ad`, `ads`, `advert`, `banner`, `sponsor`, `promo`, `tracker` or `pixel`.
