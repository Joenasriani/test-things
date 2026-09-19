# Canonical source and buyer files — 2026-09-19

The intended public sources are this repository for Manipulation and the store, and `Joenasriani/structure-of-life-book` for The Structure of Life. Source readiness, deployed behavior and successful buyer delivery are separate checks.

## Public addresses

| Property | Canonical URL | Source | Vercel project |
|---|---|---|---|
| The Reasoning Library | https://reasoning-library.vercel.app/ | `store-v3/` | `prj_wOatJv2jARExk7008J15Jv7HbcNn` |
| Manipulation — The Fool and the Wise | https://manipulation-book.vercel.app/ | repository root | `prj_LM2IRHgaBTjJ397TBzNux308FuEw` |
| The Structure of Life | https://the-structure-of-life.vercel.app/ | sibling repository | `prj_tnA6mm9ivIayBSUAfLRxIiTxtYzb` |

Use the store URL once. A second full URL appended to its path is malformed.

## September 19 repairs

The original 1,076,151-byte, 1512 × 2160 Manipulation cover replaces a corrupt 14,394-byte file. The correct Git blob is `56262bf0fdc93d3aade1a1967626f04fa4227e6f`. Browser image decoding passed on the live store and book page.

Both books' purchase links are mapped in source to their own `/api/buy` route, with product IDs `MANIPULATION-2026-09` and `STRUCTURE-2026-09`. Each fixed redirect uses the existing PayPal recipient and USD 23.33. A return visit to `/delivery` is not proof of payment.

Both complete Buyer Edition ZIPs have been assembled, with per-file manifests and checksums. See `MANIPULATION_RELEASE_MANIFEST.md` and `releases/2026-09/buyer-packages.json`. The source register retains every reference cited by the reading edition.

## Deployment status

**REMAINING SOURCE CHANGES REQUIRE DEPLOYMENT. PAYMENT AND BUYER RECEIPT ARE NOT VERIFIED.**

Last inspected READY deployments, from September 18:

- Store: `dpl_F4iAS7TJnfBj38ev9tEXepCEshAr`
- Manipulation: `dpl_Fy9jATJrfXjQKqEAy4RN33xCLnqx`
- Structure: `dpl_FSGUfFuFi2CwCkrqDqKssobn8pgF`

The original Manipulation hosted PayPal button produced an error. The replacement redirect is prepared in source; an authenticated checkout has not been completed. The existing Structure checkout encountered PayPal verification and was not proven functional or broken.

The manual production workflow requires repository/organization secret `VERCEL_TOKEN`; the inspected failed run reported it absent. The connected deployment tool also returned “Tool deploy_to_vercel not found.” After working deployment access is restored, run **Bookstore production sync** from this repository's Actions tab. Its final step checks deployed pages, product mapping and full cover bytes with `node scripts/verify-production.mjs`. Those checks do not prove payment acceptance or private delivery.

Earlier claims that all retired domains were redirect-only were incorrect. The legacy Manipulation site and test paths were still public during the September 19 audit. Retirement remains pending Vercel access.

## Buyer delivery and publication boundaries

Delivery is manual after payment verification. The seller must verify the completed transaction, product, amount/currency and recipient in the merchant account, then privately send the matching PDF, EPUB, complete ZIP and buyer guide to the verified transaction email. No automated payment notification or delivery system is implemented.

Paid files and customer records remain outside the public repository and web tree. Public hashes identify the edition without exposing its contents. EPUB container, resource and spine checks passed; full EPUBCheck was not run.

Keep the approved cover and dark editorial book design, ordinary HTML navigation, samples, methodology and terms. Technical repairs do not authorize a visual redesign.

See `PUBLISHING_RELEASE_STANDARD.md` for the complete release gate. Do not describe the commercial journey as fully verified until deployment, successful payment and actual buyer receipt have all passed.
