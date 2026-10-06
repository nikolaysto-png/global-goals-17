# Global Goals · 17

A colourful, optimistic **website** (not an app) that turns the 17 UN Sustainable
Development Goals into a wall of living interactive posters.

**Vibe:** Samsung-app polish + UN infographic design + soft motion + playful productivity.
Bold goal colours on warm paper-white, big numbers, short digestible sections,
plenty of breathing room.

## Run it

Just open `index.html` in a browser — no build step, no dependencies.
(Or serve it: `python3 -m http.server 8000`)

## Files

| File | What's inside |
|---|---|
| `index.html` | Page skeleton: nav, hero, stat strip, poster wall, quiz + pledge, about/timeline, full-screen goal viewer |
| `style.css`   | The whole design system: tokens, spring easings, rainbow progress rail, poster cards, viewer takeover, responsive + reduced-motion |
| `sdg-data.js` | All 17 goals: official colour, tagline, description, headline stats, real UN target codes |
| `posters.js`  | 17 hand-built SVG "poster artworks" — one visual world per goal (rising steps, heartbeat, wheat bowl, grad cap, scales, water drop, bolt-sun, recycle loop, waves + fish, forest, dove, linked rings…) |
| `app.js`      | Interaction engine: staggered reveals, cursor parallax tilt, search + 5P theme filters, marquee ticker, count-up numbers, keyboard-navigable viewer, personality quiz, pledges with confetti, deep links (`#goal-14`) |

## Interactions

- 🖼 Click any poster → full-screen colour takeover; `←`/`→` browse all 17, `Esc` closes
- 🔎 Search ("ocean", "school", "climate") or filter by People / Planet / Prosperity / Peace / Partnership
- 🎲 Surprise Me jumps to a random goal
- ✦ Pledge for a goal → confetti in the official 17 colours + live counter
- 🧠 30-second quiz recommends which goal needs you
- ♿ Fully keyboard accessible, honours `prefers-reduced-motion`

Data source: un.org/sustainabledevelopment. Independent tribute, not affiliated with Samsung or the UN.
