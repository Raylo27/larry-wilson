# larry-wilson

Personal brand website for Larry Wilson — business & financial coaching Patreon plus speaking bookings.

## Stack

Static single-page site. No framework, no dependencies, no build step. Site lives in `public/index.html`
(inline CSS). `npm run build` runs a zero-dependency validation check (`build-check.js`); `npm run dev`
serves the folder locally via Python's http server.

## Deploy

```sh
vercel --prod   # deploys to https://larry-wilson.vercel.app
```

## 🚩 Placeholder checklist — replace before real launch

Search the code for `TODO` comments. Everything below is a placeholder:

| # | Item | Where |
|---|------|-------|
| 1 | **Patreon URL** — replace every `https://patreon.com/PLACEHOLDER` (nav CTA, hero CTA, coaching CTA, final CTA) | `public/index.html` |
| 2 | **Booking/contact email** — replace every `mailto:booking@larrywilsoncoaching.com` (hero "Book Me to Speak", speaking box, final CTA, footer) | `public/index.html` |
| 3 | **Platform links** — Patreon, YouTube, LinkedIn, Instagram: replace the four `href="#"` platform cards + the four footer links | `public/index.html` |
| 4 | **Social proof counters** — members (500+), events (30+), years (14): edit the `.stat` figures (marked `data-edit`) | `public/index.html` |
| 5 | **Testimonials** — replace the 3 placeholder quote cards with real member/event-host quotes | `public/index.html` |
| 6 | **Photo** — swap the "LW" portrait mark for a real photo of Larry | `public/index.html` |
| 7 | **Member benefits** — confirm the 6-item benefits list and the "$__/month" price hint with Larry | `public/index.html` |
| 8 | **Speaking topics** — confirm the 4 topic rows are current | `public/index.html` |
