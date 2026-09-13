# Manipulation — The Fool and the Wise

A single-scene landing page for the complete digital collection by J. Nasr.
The painting remains the selected original; all typography and purchase controls
are HTML and CSS. No runtime JavaScript or external fonts are required.

Production: https://manipulation-the-fool-and-the-wise-two.vercel.app/
Source: https://github.com/Joenasriani/test-things

## Purchase interface

A 72px minimum-height primary purchase button, a 56px desktop header button,
and an inset 60px mobile purchase control share one PayPal checkout URL.
The visible price and structured offer are USD 23.33. Mobile content reserves
space for the fixed purchase control and the device safe area. Keyboard focus,
active states and reduced-motion preferences are supported.

Only four deliverable categories are visible. No methods, prompts, worked
examples, output schemas or reference registers belong in this repository.
The old sample is removed from the current site and branch. Prior commits and
previously downloaded copies can still contain it; this release does not erase
publication history or assert that previously shared content is confidential.

## Deployment

Use the existing RoboMarket project manipulation-the-fool-and-the-wise-v2.
Deploy these files only: index.html, styles.css, robots.txt, sitemap.xml,
vercel.json, assets/cover.jpg and assets/collection-scene.webp.
No install or build command is needed. This release uses the Vercel connector;
Git push does not imply automatic deployment unless Git integration is configured.

## Commercial operation

PayPal opens an external payment page. Payment completion and file delivery have
not been transaction-tested. The site has no automatic delivery integration.
The seller must verify payment and provide the current customer ZIP privately.
Do not place paid ZIP files or private instructions in this public repository.

## SEO

Descriptive title and visible subject terms, self-referencing canonical URL,
Open Graph/Twitter metadata, Book/Product JSON-LD, robots.txt and sitemap.
Metadata describes deliverables only. Price changes require updating every
checkout URL, visible price and structured offer together. Indexing is not guaranteed.

## Design research

- https://baymard.com/learn/ecommerce-ux-best-practices
- https://baymard.com/learn/button-design
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
- https://www.nngroup.com/articles/button-states-communicate-interaction/

These sources inform purchase-action prominence, labeling and target size.
No conversion improvement or sales lift has been measured for this page.

## SEO references

- https://developers.google.com/search/docs/appearance/title-link
- https://developers.google.com/search/docs/appearance/snippet
- https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- https://developers.google.com/search/docs/appearance/structured-data/product
