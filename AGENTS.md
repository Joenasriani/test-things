# BOOKSTORE AI EXECUTION RULES

For any work affecting `store/`, treat these files as canonical and mandatory:

- `store/DESIGN_RULES.md`
- `store/MARKETING_RULES.md`

For any work affecting `store-v3/`, also treat this file as canonical and mandatory:

- `store-v3/COUNCIL_FRAMEWORK.md`

The V3 council framework must stay active for design, copy, UX and conversion decisions:
- James Clear lens: instant comprehension, minimum friction, immediate purchase legibility.
- Mark Manson lens: the page must inherit the specific book's worldview and voice; the hook does the selling before explanation.
- Tim Ferriss lens: surface unusual utility and leverage without turning the page into a feature list or promising outcomes.
- Council intersection: Cover → Title → Provocative idea → Compressed utility → Price → BUY → See inside.

Hard constraints for bookstore changes:

- Keep the books visually dominant and the interface minimal.
- Preserve the path: Store → Buy = 1 click; Store → Book page → Buy/Sample = maximum 2 clicks.
- No signup, account, backend, CMS, database, store-side checkout, pop-up, newsletter interruption, or conversion clutter unless a future requirement explicitly justifies it.
- Use source-backed book facts only. Unknown or inferred marketing claims must not be published as fact.
- Keep one dominant purchase action per book and one clear path to the dedicated book page.
- Do not replace the editorial composition with generic product cards, ecommerce templates, SaaS styling, AI aesthetics, or decorative UI.
- Preserve mobile, tablet, and desktop as deliberate compositions.
- Prefer zero-dependency/static solutions while the catalogue can be handled safely with files.
- For `store/`, run `node tools/audit-store.mjs` after catalogue or interaction changes and fix every failure.

The bookstore should perform the marketing through the book, its positioning, its evidence, its price and its clarity—not through added marketing decoration.
