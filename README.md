# Manipulation — The Fool and the Wise

A single-scene landing page for the complete digital collection by J. Nasr.
The original painting sets the mood behind the actual book cover. All typography and purchase controls
are HTML and CSS. No runtime JavaScript is required. Manrope is self-hosted with its SIL Open Font License.

Production: https://manipulation-the-fool-and-the-wise-two.vercel.app/
Source: https://github.com/Joenasriani/test-things
Master book-production rules: `BOOK_PRODUCTION_FRAMEWORK.md`

## Locked positioning — 15 September 2026

The page now sells the book first as a serious study of the darker mechanics of human influence, deception and power.

Locked public-facing direction:
- **Watch what life repeats and men neglect.**
- **See the mechanism behind the message.**
- Dark psychology / influence / deception / power remain visible subject signals.
- AI material remains in the product package, but the landing page does not lead by redefining the book as an AI product.
- Counts and package components are supporting proof, not the main promise.
- No existing book content is to be removed merely to simplify the sale.

## Purchase interface

Exactly one purchase link appears in the document and stays in normal flow on
all screen sizes. No duplicated header or fixed mobile checkout bar. The free
sample is the secondary action beside the extras disclosure. The price is displayed separately beside the single Buy button. The price and offer remain
USD 23.33, with workbook, research atlas, source register and AI companion files
included at no extra cost.
Keyboard focus, touch targets and reduced-motion preferences are supported.

The original free sample is available beside the offer on desktop and mobile.
Paid packages and private instructions remain outside this repository.

## Deployment

Use the existing RoboMarket project `manipulation-the-fool-and-the-wise-v2`.
Deploy these files only: `index.html`, `styles.css`, `robots.txt`, `sitemap.xml`,
`vercel.json`, `assets/cover.jpg`, `assets/collection-scene.webp` and `assets/Manipulation_Free_Sample.pdf`.
No install or build command is needed. Git push does not imply automatic deployment unless Git integration is configured.

## Commercial operation

PayPal opens an external payment page. Payment completion and file delivery have
not been transaction-tested. The site has no automatic delivery integration.
The seller must verify payment and provide the current customer ZIP privately.
Do not place paid ZIP files or private instructions in this public repository.

## SEO

The production page uses:
- a descriptive title using real subject language
- a unique meta description
- self-referencing canonical URL
- index/follow robots directive
- Open Graph/Twitter metadata
- Book/Product/Offer JSON-LD
- visible real-text subject terms
- robots.txt
- sitemap.xml

The landing page must remain understandable without requiring animation or interaction. No hidden keyword blocks, doorway pages, invented reviews, fake scarcity or mass-generated duplicate pages. Price changes require updating the visible price, PayPal URL and structured offer together. Indexing is not guaranteed.

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
bar that repeated the primary action and occupied reading space. The sequence is title, actual cover, original editorial aphorism, subject and evidence scope, included extras, and one purchase action. The sample remains available before buying.
The aphorism is original sales copy, not a quotation attributed to Machiavelli.
The book is research-informed and AI-assisted; neither peer review of this
edition, exhaustive scientific validation, nor AI-free authorship is claimed.
No keyword stuffing, hidden SEO paragraphs, invented reviews or bonus valuations.

## Cover and first-screen revision — 14 September 2026

The actual cover appears at its original proportions, with a restrained CSS book
edge and tilt. The painted scene, ink, aged gold and crimson remain the visual
direction. The price is a distinct element beside the only Buy link.
Delivery is explicitly described as email after payment verification.

The responsive composition uses normal document flow and `min-height: 100svh`.
Phone layouts reduce spacing and cover size. Scrolling is allowed for enlarged text and very short viewports, so no content or controls are clipped. No fixed checkout bar, forced viewport height, runtime JavaScript or external font request is needed.

## Search + positioning revision — 15 September 2026

Updated the landing page and library source to the finalized framework:
- public identity moved from “AI book” toward manipulation / dark psychology / influence / deception / power
- the AI framework remains included as a companion asset
- selling line locked to “See the mechanism behind the message.”
- search metadata now describes the actual subject rather than leading with the AI companion
- Product/Offer structured data now declares availability
- sitemap last-modified date refreshed
- the bookstore receives a canonical URL, its own robots/sitemap files and an implicit-AI store description

The public package remains the currently published 157-page edition until a revised book binary is generated from the project-thread research sources. The new research taxonomy must not be advertised as already inside the customer ZIP until that replacement package exists.
