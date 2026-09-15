# BOOKSTORE AI EXECUTION RULES

For any work on books, publishing, landing pages, SEO or the bookstore, first read and follow:

- `BOOK_PRODUCTION_FRAMEWORK.md`

For any work affecting `store/`, also treat these files as canonical and mandatory:

- `store/DESIGN_RULES.md`
- `store/MARKETING_RULES.md`

For any work affecting `store-v3/`, also treat this file as canonical and mandatory:

- `store-v3/COUNCIL_FRAMEWORK.md`

Current finalized V3 catalogue:
1. **Manipulation — The Fool and the Wise**
2. **The Structure of Life — The Structure of Reasoning**

Canonical store description:
**Books on human behavior and hidden structure, built as reference systems for reasoning, research and new ideas. A motive in one discipline. A missing variable in another.**

The V3 council + reasoning framework must stay active for design, copy, UX and conversion decisions:
- James Clear lens: instant comprehension, minimum friction, immediate purchase legibility.
- Mark Manson lens: each book inherits its own worldview without forcing the entire store into that mood.
- Tim Ferriss lens: surface unusual utility and leverage without feature-list clutter or promises.
- Reasoning kernel: FRAME → TRY → CHECK → UPDATE → STOP.

## Locked customer-facing grammar

**Large thumbnail → Title → Very short selling line → Compressed utility → Clickable price / direct purchase**

Hard constraints:

- **The bookstore shell is bright, clear, useful and easy to browse.**
- **On desktop, both books and their core buying information should be visible together when space allows.**
- **Each book is a large visual object, never a small generic ecommerce card.**
- **Thumbnail click → dedicated book landing page.**
- **Title click → dedicated book landing page.**
- **Visible price/purchase line click → direct payment route in one click.** Do not add a redundant generic Buy button beside it.
- **Each dedicated book landing page must always expose a clearly visible route back to `https://reasoning-library.vercel.app/`.** The return control must use that book's own visual language, not a generic Back button.
- Keep selling descriptions extremely short. Do not explain the book on the store page.
- Do not hide important information behind mood, low contrast, unnecessary scrolling, hover-only discovery, accordions, silent placement or decorative treatment.
- No signup, account, backend, CMS, database, store-side checkout, pop-up, newsletter interruption, generic card grid, SaaS styling, generic AI aesthetics, fashionable gradients, glass, pills, badges, or fake urgency.
- Use source-backed book facts only. Unknown or inferred marketing claims must not be published as fact.
- Each book keeps its authored identity inside the shared bright store: Manipulation through its cover, crimson cues and controlled psychological imagery; The Structure of Life through structural geometry, typographic logic and its own color system.
- **No arbitrary placement. No mood for mood's sake.** Every element must have an obvious relationship to the exact selling scenario, its neighboring information, or the action it supports.
- Interactivity must be restrained and meaningful: book-object movement, hover response, direct-purchase response or navigation feedback. No decorative floating motion.
- Preserve mobile, tablet and desktop as deliberate compositions.
- Prefer zero-dependency/static solutions while files remain sufficient.
- Do not expose internal reasoning architecture as customer-facing copy or interface.
- AI usefulness should be discoverable through the books' structure and included material, not by making the public store an AI-tool landing page.
- Never simplify or remove book content merely to make selling easier. Research and the finished book remain the source of truth.
- For `store/`, run `node tools/audit-store.mjs` after catalogue or interaction changes and fix every failure.
- For `store-v3/`, run `node tools/audit-store-v3.mjs` after design, copy, catalogue or interaction changes and fix every failure.

The bookstore performs the marketing through the books, their usefulness, positioning, evidence, price and clarity—not through added marketing decoration.
