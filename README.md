# Manipulation — The Fool and the Wise

A single-scene landing page for the complete digital collection by J. Nasr.
The original painting sets the mood behind the actual book cover. All typography and purchase controls
are HTML and CSS. No runtime JavaScript or external fonts are required.

Production: https://manipulation-the-fool-and-the-wise-two.vercel.app/
Source: https://github.com/Joenasriani/test-things

## Purchase interface

Exactly one purchase link appears in the document and stays in normal flow on
all screen sizes. No duplicated header or fixed mobile checkout bar. The free
sample is the secondary header action. The price is displayed separately beside the single Buy button. The price and offer remain
USD 23.33, with workbook, research atlas, source register and AI companion files
included at no extra cost. All included files were checked against the customer ZIP.
Keyboard focus, touch targets and reduced-motion preferences are supported.

The original free sample is available through the header on desktop and mobile.
Paid packages and private instructions remain outside this repository.

## Deployment

Use the existing RoboMarket project manipulation-the-fool-and-the-wise-v2.
Deploy these files only: index.html, styles.css, robots.txt, sitemap.xml,
vercel.json, assets/cover.jpg, assets/collection-scene.webp and assets/Manipulation_Free_Sample.pdf.
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

## Copy and interface audit — 14 September 2026

Removed competing purchase controls, their unused styles, and the fixed mobile
bar that repeated the primary action and occupied reading space. The sequence is title, actual cover, original editorial aphorism, subject and
evidence scope, included extras, and one purchase action. The sample remains available before buying.
The aphorism is original sales copy, not a quotation attributed to Machiavelli.
The book is research-informed and AI-assisted; neither peer review of this
edition, exhaustive scientific validation, nor AI-free authorship is claimed.
The visible description and search/social metadata describe the same subject.
No keyword stuffing, hidden SEO paragraphs, invented reviews or bonus valuations.

Verified phone (390px) and tablet (768px) compositions in browser frames: one
purchase link per document, a retained sample link, loaded artwork, and no
horizontal overflow. Desktop checked on the deployed page.

## Cover and first-screen revision — 14 September 2026

The actual cover appears at its original proportions, with a restrained CSS book
edge and tilt. The painted scene, ink, aged gold and crimson remain the visual
direction. The price is now a distinct element beside the only Buy link.
The brief description names the subject for readers and search engines, separates
hypotheses from cited research, and hints at future applications. Delivery is
explicitly described as email after payment verification. The sample is unchanged.

The responsive composition uses normal document flow and `min-height: 100svh`.
Phone layouts reduce spacing and cover size; on the shortest narrow screens the
cover sits beside the aphorism. Scrolling is allowed for enlarged text and very
short viewports, so no content or controls are clipped. No fixed checkout bar,
forced viewport height, runtime JavaScript or external font request is needed.

Additional design and accessibility sources:
- https://baymard.com/blog/product-page-price-discounts
- https://www.w3.org/WAI/WCAG21/Understanding/reflow
- https://developers.google.com/search/docs/appearance/structured-data/sd-policies

This is a design application of usability research, not a measured conversion
claim. Any responsive test fixtures are preview-only and excluded from production.
