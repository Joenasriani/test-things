# BOOKSTORE AI EXECUTION RULES

For any work affecting `store/`, treat these files as canonical and mandatory:

- `store/DESIGN_RULES.md`
- `store/MARKETING_RULES.md`

For any work affecting `store-v3/`, also treat this file as canonical and mandatory:

- `store-v3/COUNCIL_FRAMEWORK.md`

Current finalized V3 catalogue:
1. **Manipulation — The Fool and the Wise**
2. **The Structure of Life — The Structure of Reasoning**

Canonical store description:
**Books on human behavior and hidden structure—reference libraries for readers, builders and AI. A motive in one discipline. A missing variable in another.**

The V3 council + reasoning framework must stay active for design, copy, UX and conversion decisions:
- James Clear lens: instant comprehension, minimum friction, immediate purchase legibility.
- Mark Manson lens: each book must inherit its own worldview and voice; the hook does the selling before explanation.
- Tim Ferriss lens: surface unusual utility and leverage without turning the page into a feature list or promising outcomes.
- Reasoning kernel: FRAME → TRY → CHECK → UPDATE → STOP. Every proposed element is a candidate and survives only if it improves the buying decision more than it costs in friction, clutter, ambiguity or visual weight.
- Council intersection per book: Cover → Title → Provocative idea → Compressed utility → Price → BUY → See inside.

Hard constraints for bookstore changes:

- Keep the books visually dominant and the interface minimal.
- The store description stays short and subordinate to the catalogue.
- Preserve the path: Store → Buy = 1 click; Store → Book page → Buy/Sample = maximum 2 clicks.
- No signup, account, backend, CMS, database, store-side checkout, pop-up, newsletter interruption, or conversion clutter unless a future requirement explicitly justifies it.
- Use source-backed book facts only. Unknown or inferred marketing claims must not be published as fact.
- Keep one dominant purchase action per book and one clear path to the dedicated book page.
- Do not replace the editorial composition with generic product cards, ecommerce templates, SaaS styling, generic AI aesthetics, or decorative UI.
- Each book must remain an authored visual environment. Manipulation is dark and psychological; The Structure of Life is bright, structural and cross-disciplinary.
- Preserve mobile, tablet, and desktop as deliberate compositions.
- Prefer zero-dependency/static solutions while the catalogue can be handled safely with files.
- Do not expose internal reasoning architecture as customer-facing copy or interface.
- For `store/`, run `node tools/audit-store.mjs` after catalogue or interaction changes and fix every failure.
- For `store-v3/`, run `node tools/audit-store-v3.mjs` after design, copy, catalogue or interaction changes and fix every failure.

The bookstore should perform the marketing through the books, their positioning, evidence, price and clarity—not through added marketing decoration.
