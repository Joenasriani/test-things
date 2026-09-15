# BOOKSTORE V3 — COUNCIL + REASONING FRAMEWORK

Use this framework for every design, copy, UX and conversion decision in `store-v3/`.

The master production order and book-level rules live in `../BOOK_PRODUCTION_FRAMEWORK.md` and override downstream store convenience.

## James Clear lens — instant comprehension
- A visitor should understand the store, both books, their usefulness, price and purchase actions within seconds.
- Remove anything that delays comprehension.
- Keep the value proposition concrete, short and immediately scannable.
- Make the path to purchase obvious without conversion clutter.

## Mark Manson lens — each book sells through its worldview
- Every book must feel inseparable from its own subject and intellectual world.
- Lead with the strongest thought, not an explanation of the thought.
- Preserve tension, personality and specificity. Never flatten a book into generic ecommerce language.
- The store shell is bright and clear; a book's darker or more specific mood lives inside the book object, imagery, typography and accents rather than darkening the whole shop.

## Tim Ferriss lens — visible utility and leverage
- Make the package feel useful, actionable and richer than an ordinary ebook.
- Surface unusual material without turning the page into a feature list.
- Let the buyer infer intellectual leverage from what is included; never promise outcomes or profit.

## Reasoning kernel — how every proposed change is judged

### FRAME
Define the visitor's actual decision:
**What are these books, what can I use them for, which one interests me, and is it worth buying?**

### TRY
Any new element is only a candidate: copy, image, spacing, price treatment, CTA, interaction, atmosphere or metadata.

### CHECK
A candidate survives only if it materially improves at least one of:
- immediate comprehension
- curiosity
- perceived usefulness
- credibility
- purchase clarity
- browsing ease
- visibility of the books and their actions

It must not materially worsen:
- friction
- clutter
- ambiguity
- genericness
- visual hierarchy
- source accuracy
- scenario fit
- search visibility

### UPDATE
Every candidate is classified:
- **KEEP** — clearly improves the decision experience.
- **REVISE** — useful idea, wrong execution or placement.
- **REJECT** — adds more than it earns.
- **REFRAME** — the underlying page assumption was wrong.

### STOP
Stop adding when the store is the simplest version that preserves desire, clarity, trust, direct purchase, search visibility and browsing pleasure. Stopping does not mean the design is universally optimal; it means no tested addition currently earns its visual or cognitive cost.

## Store-level positioning

The store currently contains exactly two books:
1. **Manipulation — The Fool and the Wise**
2. **The Structure of Life — The Structure of Reasoning**

Canonical store description:

> **Books on human behavior and hidden structure, built as reference systems for reasoning, research and new ideas. A motive in one discipline. A missing variable in another.**

The books may include AI frameworks, structured data or AI-facing applications where relevant, but AI usefulness should be inferred from the architecture and included material. Do not turn the store into an AI-tool landing page.

## Council intersection — canonical store grammar

**Large book thumbnail → Title → Very short selling line → Compressed utility → Clickable price / direct purchase**

Hard rules:
1. **The bookstore itself is bright, clear and easy to browse.** Do not use a dark store shell just because one book has a dark subject.
2. **Both books and all primary actions must be visible and legible.** Never hide useful content in silence, low contrast, excessive scrolling or mood treatment.
3. **Each book is shown as a large visual object, not a small ecommerce card.** On desktop, both large book panels should be visible together when space allows.
4. **Clicking either the book thumbnail or the book title opens that book's dedicated landing page.**
5. **The price itself is the direct-buy surface.** Clicking the visible price/purchase line goes directly to the existing payment route in one click. Do not add a second generic store Buy button beside it.
6. **The selling description is extremely short.** It should increase curiosity or usefulness in one line, not explain the book.
7. Each dedicated book landing page must contain an always-visible, clearly labeled route back to **The Reasoning Library**. That control must inherit the book's own visual language rather than looking like a generic Back button.
8. The books are the store. Store branding stays clear but secondary to the products.
9. The store description stays short and immediately explains usefulness.
10. No testimonials, badges, feature cards, newsletter capture, pop-ups, repeated CTA, fake urgency, generic ecommerce cards, SaaS styling or AI decoration.
11. Each cover must carry substantial visual weight and remain immediately identifiable.
12. Use only source-backed book facts.
13. AI relevance may be signaled through included material, but never by redefining either book or the store as an AI product.
14. Each book retains its own authored identity inside the shared bright store: Manipulation through its cover, crimson cues and controlled psychological imagery; The Structure of Life through structural geometry, typographic logic and its own color system.
15. **No mood for mood's sake.** Atmosphere is allowed only when it helps identify the book or understand its subject. It must never reduce clarity or usefulness.
16. **No arbitrary placement.** Every element must have an obvious relationship to the book, information hierarchy or action beside it. If placement looks accidental, isolated, decorative or unexplained, recompose it.
17. Interaction must be attached to meaning: book-object movement, clear hover response, direct-purchase response or navigation feedback. No decorative floating animation.
18. Mobile may stack the books, but each book must remain fully understandable without hunting.
19. Desktop, tablet and mobile are composed independently and checked perceptually.
20. Do not expose the reasoning framework in the customer-facing interface. It governs decisions; it is not page content.
21. If an element does not help the visitor understand, desire, trust, browse or buy a book, remove it.
22. The store and each landing page must remain crawlable, canonical, semantically structured and free of hidden SEO content or duplicate-indexing anomalies.
23. Never change or remove confirmed book content merely to simplify store copy. The book is upstream; the store is downstream.

### Manipulation — locked store direction
- Selling line: **See the mechanism behind the message.**
- Keep the dark psychology / darker human behavior attraction.
- Compressed utility should signal evidence, mechanisms and case analysis.
- AI remains part of the product where present, but is not the leading identity.
- Counts are proof of depth, not the headline.

Council test before accepting a change:
- **Clear:** Is everything important understood and visible immediately?
- **Manson:** Does each book unmistakably feel like itself without forcing the whole store into that mood?
- **Ferriss:** Is practical/intellectual value visible without explanation?
- **Scenario-fit:** Does every placement, visual treatment and interaction make sense for selling these exact books here?
- **Navigation:** Thumbnail/title → book page; price → direct purchase; book page → obvious return to the library.
- **Search:** Can crawlers understand the page without executing a decorative interaction?
- **Reasoning check:** Did the element survive a concrete benefit-versus-cost test?
- **Intersection:** Does anything stand between the visitor and understanding or buying the books?

If an element fails the tests, remove or reframe it.
