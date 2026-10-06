# 🌍 SDG Atlas — The 17 UN Sustainable Development Goals

An interactive, single-page tribute to the United Nations 2030 Agenda.
No frameworks, no build step — just open `index.html` in any browser.

## Features
- **Animated particle constellation** background tinted with the 17 official goal colours
- **Draggable SDG wheel** (SVG) with inertia spin, hover focus & click-through
- **Iconic wall of 17 goal tiles** with 3D tilt, spotlight cursor, staggered scroll reveals
- **Live search + theme filters** (People / Planet / Prosperity / Peace / Partnership)
- **Goal detail modal** for every goal: description, key stats and official targets
- **"Road to 2030" animated timeline** (1945 → 2030)
- **"Which Goal Needs You?" personality quiz** that auto-opens your matched goal
- **Pledge button with confetti burst**, count-up hero stats, marquee, magnetic buttons,
  cursor glow, smart hiding navbar, scroll-progress bar, "Surprise me" random goal
- Fully responsive, keyboard accessible (Esc closes modal), honours `prefers-reduced-motion`

## Files
| File | Purpose |
|------|---------|
| `index.html` | Page structure |
| `style.css` | All styling & animations |
| `sdg-data.js` | Dataset of all 17 goals (official colours, taglines, stats, targets) |
| `app.js` | Interactivity engine |

## Run locally
```bash
python3 -m http.server 8090   # then visit http://localhost:8090
```
