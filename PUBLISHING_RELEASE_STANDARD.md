# BOOKSTORE — Publishing Release Standard

Release control date: 2026-09-17

## Governing rule

A book is commercially releasable only when the public page, canonical publication files, buyer package, payment offer, delivery method, and release manifest all describe the same edition.

`final`, `latest`, `(1)`, `v2`, `v3`, `ULTIMATE`, or a recent timestamp does not establish canonical status by itself.

## Canonical publication objects

1. **Main Book** — fixed-layout PDF.
2. **EPUB** — reflowable ebook where produced.
3. **Study Workbook** — separate practice companion.
4. **Research Atlas** — underlying evidence/taxonomy or structured research substrate.
5. **Source Register** — provenance/source records.
6. **Structured Knowledge Register** — machine-readable CSV/JSON data.
7. **AI Reasoning Framework** — book-derived reasoning protocol for AI-assisted use.
8. **Application Materials** — only when intentionally included; clearly separated from validated products.
9. **Free Sample** — public genuine excerpt; never the paid archive.
10. **Buyer README** — contents, edition, support/delivery information and usage notes.
11. **Release Manifest** — exact filenames, edition, status and hashes.
12. **Digital Product Terms** — delivery/refund/license/support terms as actually offered.

## Naming convention

Use:

`<Book_Slug>_<Object>_<Edition_YYYY-MM>.<ext>`

Buyer archive:

`<Book_Slug>_Buyer_Edition_<Edition_YYYY-MM>.zip`

Do not use `FINAL.zip`, `final2`, `latest`, `copy`, `(1)`, `ULTIMATE`, `NEW`, or `corrected-final` as canonical buyer-facing filenames.

## Buyer archive folder order

```text
00_README/
01_BOOK/
02_EPUB/
03_STUDY_WORKBOOK/
04_RESEARCH_ATLAS/
05_SOURCE_REGISTER/
06_STRUCTURED_KNOWLEDGE/
07_AI_REASONING_FRAMEWORK/
08_APPLICATION_MATERIALS/
90_TERMS/
RELEASE_MANIFEST.json
SHA256SUMS.txt
```

Omit a folder when that artifact does not exist. Never add a placeholder that is advertised as content.

## Public/private separation

**Public:** landing page, methodology, selected bibliography/source explanation, free sample, seller/contact/terms/privacy/refund/delivery information and product metadata.

**Private / buyer-only:** full book, full EPUB, paid workbook, paid research atlas, source/knowledge registers, paid AI framework and buyer archive.

## Release gate

All of the following must pass before a release is called current:

- Title, subtitle, author and edition are identical across PDF, EPUB, page, structured data and manifest.
- Price is identical across page, checkout and structured data.
- Every promised component physically exists.
- The public sample resolves and contains only sample material.
- Paid files are not publicly enumerable.
- Delivery is tested from payment to receipt.
- PDF opens and page count matches the offer.
- EPUB navigation and metadata validate.
- Source/evidence labels are explained.
- AI assistance/provenance is disclosed where applicable.
- No obsolete price or superseded copy appears in the buyer archive.
- SHA-256 hashes are generated after final packaging.

## Canonical terminology

Use **Research Atlas**, **Source Register**, **Structured Knowledge Register**, **Study Workbook**, **AI Reasoning Framework**, **Free Sample**, **Buyer Edition Package**, and **Release Manifest** consistently. Marketing language may explain benefits but must not rename publication objects.
