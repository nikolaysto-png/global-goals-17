/* ============================================================
   POSTER ART — 17 hand-built SVG "interactive posters"
   Each poster is generated on a white artboard in the goal's
   official colour family: bold geometric shapes, oversized
   numbers, infographic elements. No stock photography needed.
   ============================================================ */

const INK = "#0F1420";

function svgWrap(inner, opts) {
  const w = (opts && opts.w) || 600, h = (opts && opts.h) || 600;
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" class="poster-svg" aria-hidden="true">${inner}</svg>`;
}

/* helpers */
const dotsGrid = (x, y, cols, rows, gap, r, fill, op) => {
  let s = "";
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++)
    s += `<circle cx="${x + i * gap}" cy="${y + j * gap}" r="${r}" fill="${fill}" opacity="${op}"/>`;
  return s;
};
const ring = (cx, cy, r, stroke, sw, dash, cls) =>
  `<circle class="${cls || ""}" cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ""}/>`;
const bigNum = (x, y, txt, size, fill, extra) =>
  `<text x="${x}" y="${y}" font-family="Sora, Inter, sans-serif" font-weight="800" font-size="${size}" fill="${fill}"${extra || ""}>${txt}</text>`;

const POSTERS = {
  /* 1 · No Poverty — rising steps out of poverty */
  1(c) {
    const t = c + "22", m = c + "55";
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <circle cx="470" cy="150" r="120" fill="${t}"/>
      <path d="M60 540 h120 v-90 h120 v-90 h120 v-90 h120 v-90" fill="none" stroke="${c}" stroke-width="14" stroke-linejoin="round"/>
      <g class="pa-rise">
        <circle cx="180" cy="470" r="26" fill="${c}"/><rect x="172" y="496" width="16" height="44" rx="8" fill="${c}"/>
      </g>
      <g class="pa-rise pa-d2">
        <circle cx="420" cy="290" r="26" fill="${INK}"/><rect x="412" y="316" width="16" height="44" rx="8" fill="${INK}"/>
      </g>
      ${bigNum(90, 200, "1", 170, c + "33")}
      ${dotsGrid(80, 560, 10, 2, 46, 5, m)}
      <rect x="60" y="540" width="480" height="12" rx="6" fill="${c}"/>`);
  },

  /* 2 · Zero Hunger — grain bowl + wheat */
  2(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      ${ring(300, 250, 150, c + "33", 3)}
      <path d="M140 330 A160 160 0 0 0 460 330 Z" fill="${c}"/>
      <path d="M140 330 h320" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <g stroke="${c}" stroke-width="9" fill="none" stroke-linecap="round">
        <path d="M300 300 C300 210 300 160 300 120"/>
        <path d="M300 240 C260 230 235 205 228 172 C266 178 292 202 300 240"/>
        <path d="M300 240 C340 230 365 205 372 172 C334 178 308 202 300 240"/>
        <path d="M300 185 C268 176 250 155 245 128 C276 133 294 154 300 185"/>
        <path d="M300 185 C332 176 350 155 355 128 C324 133 306 154 300 185"/>
      </g>
      ${bigNum(430, 150, "2", 150, c + "33")}
      ${dotsGrid(70, 430, 8, 3, 44, 6, c + "55")}`);
  },

  /* 3 · Good Health — heartbeat + shield cross */
  3(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M300 470 C180 390 120 320 120 240 C120 170 175 130 230 130 C268 130 292 152 300 172 C308 152 332 130 370 130 C425 130 480 170 480 240 C480 320 420 390 300 470 Z" fill="${c}"/>
      <path class="pa-pulse" d="M150 280 L240 280 L262 236 L292 320 L318 258 L336 280 L450 280" fill="none" stroke="#fff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      ${bigNum(70, 150, "3", 130, c + "33")}
      <circle cx="500" cy="500" r="46" fill="${c}22"/>
      <circle class="pa-beat" cx="500" cy="500" r="26" fill="${c}"/>
      ${dotsGrid(90, 520, 9, 2, 44, 5, c + "55")}`);
  },

  /* 4 · Quality Education — open book + grad cap */
  4(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M300 380 C240 340 160 340 110 355 L110 500 C165 485 240 488 300 520 C360 488 435 485 490 500 L490 355 C440 340 360 340 300 380 Z" fill="${c}"/>
      <path d="M300 380 L300 520" stroke="#fff" stroke-width="10"/>
      <path d="M300 330 L430 285 L300 240 L170 285 Z" fill="${INK}"/>
      <path d="M380 305 L380 360" stroke="${INK}" stroke-width="7"/>
      <circle cx="380" cy="368" r="10" fill="${c}"/>
      ${bigNum(420, 170, "4", 150, c + "33")}
      ${ring(120, 150, 60, c + "44", 4, "10 14")}
      ${dotsGrid(80, 560, 10, 2, 46, 5, c + "55")}`);
  },

  /* 5 · Gender Equality — balanced scales */
  5(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <g class="pa-sway" style="transform-origin:300px 160px">
        <path d="M140 200 H460" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
        <path d="M140 200 L110 300 M140 200 L170 300" stroke="${c}" stroke-width="7"/>
        <path d="M100 300 A40 40 0 0 0 180 300 Z" fill="${c}"/>
        <path d="M460 200 L430 300 M460 200 L490 300" stroke="${c}" stroke-width="7"/>
        <path d="M420 300 A40 40 0 0 0 500 300 Z" fill="${c}"/>
      </g>
      <path d="M300 160 V470" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <path d="M240 470 H360" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>
      <circle cx="300" cy="160" r="16" fill="${c}"/>
      ${bigNum(70, 140, "5", 130, c + "33")}
      ${dotsGrid(420, 520, 5, 3, 40, 6, c + "55")}`);
  },

  /* 6 · Clean Water — giant drop + ripples */
  6(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M300 90 C380 210 430 270 430 340 A130 130 0 0 1 170 340 C170 270 220 210 300 90 Z" fill="${c}"/>
      <path d="M250 330 A60 60 0 0 0 235 385" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>
      ${ring(300, 470, 90, c + "44", 5, "")}
      ${ring(300, 470, 130, c + "2a", 5, "")}
      ${ring(300, 470, 170, c + "14", 5, "")}
      ${bigNum(60, 150, "6", 140, c + "33")}
      ${dotsGrid(430, 80, 4, 4, 40, 6, c + "55")}`);
  },

  /* 7 · Clean Energy — bolt sun + rays */
  7(c) {
    let rays = "";
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      rays += `<line x1="${300 + Math.cos(a) * 175}" y1="${280 + Math.sin(a) * 175}" x2="${300 + Math.cos(a) * 215}" y2="${280 + Math.sin(a) * 215}" stroke="${c}" stroke-width="12" stroke-linecap="round"/>`;
    }
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <g class="pa-spin" style="transform-origin:300px 280px">${rays}</g>
      <circle cx="300" cy="280" r="140" fill="${c}"/>
      <path class="pa-float" d="M320 180 L240 300 H295 L275 390 L365 260 H305 Z" fill="#fff"/>
      ${bigNum(70, 540, "7", 130, c + "33")}
      ${dotsGrid(420, 470, 5, 4, 38, 6, c + "55")}`);
  },

  /* 8 · Decent Work — growth chart + arrow */
  8(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M70 520 H530" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <path d="M70 520 V90" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <rect x="120" y="400" width="70" height="120" rx="10" fill="${c}55"/>
      <rect x="230" y="330" width="70" height="190" rx="10" fill="${c}88"/>
      <rect x="340" y="240" width="70" height="280" rx="10" fill="${c}"/>
      <path class="pa-draw" d="M130 360 L260 280 L380 190 L480 120" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      <path d="M480 120 L440 128 M480 120 L472 160" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>
      ${bigNum(420, 300, "8", 150, c + "26")}
      ${dotsGrid(100, 130, 5, 3, 40, 6, c + "55")}`);
  },

  /* 9 · Innovation — network nodes over skyline */
  9(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <g fill="${c}22">
        <rect x="80" y="380" width="80" height="160" rx="8"/>
        <rect x="180" y="330" width="80" height="210" rx="8"/>
        <rect x="280" y="400" width="80" height="140" rx="8"/>
        <rect x="380" y="300" width="80" height="240" rx="8"/>
      </g>
      <g stroke="${c}" stroke-width="6">
        <line x1="120" y1="220" x2="270" y2="130"/><line x1="270" y1="130" x2="450" y2="180"/>
        <line x1="450" y1="180" x2="380" y2="300"/><line x1="120" y1="220" x2="220" y2="330"/>
      </g>
      <circle class="pa-float" cx="120" cy="220" r="22" fill="${c}"/>
      <circle class="pa-float pa-d2" cx="270" cy="130" r="26" fill="${INK}"/>
      <circle class="pa-float pa-d3" cx="450" cy="180" r="22" fill="${c}"/>
      <circle cx="380" cy="300" r="16" fill="${c}"/>
      <circle cx="220" cy="330" r="16" fill="${c}"/>
      ${bigNum(440, 470, "9", 150, c + "33")}
      ${dotsGrid(470, 380, 3, 2, 40, 6, c + "55")}`);
  },

  /* 10 · Reduced Inequalities — equal bars */
  10(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M60 300 H540" stroke="${INK}" stroke-width="6" stroke-dasharray="4 16" stroke-linecap="round"/>
      <rect x="90" y="150" width="70" height="300" rx="14" fill="${c}"/>
      <rect x="210" y="230" width="70" height="220" rx="14" fill="${c}99"/>
      <rect x="330" y="280" width="70" height="170" rx="14" fill="${c}66"/>
      <rect x="450" y="330" width="70" height="120" rx="14" fill="${c}44"/>
      <path class="pa-slide" d="M125 100 V50 M485 450 V500" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      <path d="M110 62 L125 45 L140 62 M470 488 L485 505 L500 488" fill="none" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>
      ${bigNum(250, 560, "10", 110, c + "26")}
      ${dotsGrid(70, 500, 3, 2, 36, 6, c + "55")}`);
  },

  /* 11 · Sustainable Cities — buildings + leaf */
  11(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <rect x="90" y="260" width="110" height="260" rx="10" fill="${c}"/>
      <rect x="220" y="180" width="130" height="340" rx="10" fill="${INK}"/>
      <rect x="370" y="300" width="100" height="220" rx="10" fill="${c}88"/>
      <g fill="#fff">
        <rect x="112" y="290" width="24" height="24" rx="5"/><rect x="152" y="290" width="24" height="24" rx="5"/>
        <rect x="112" y="340" width="24" height="24" rx="5"/><rect x="152" y="340" width="24" height="24" rx="5"/>
        <rect x="245" y="215" width="26" height="26" rx="5"/><rect x="290" y="215" width="26" height="26" rx="5"/>
        <rect x="245" y="268" width="26" height="26" rx="5"/><rect x="290" y="268" width="26" height="26" rx="5"/>
        <rect x="245" y="321" width="26" height="26" rx="5"/><rect x="290" y="321" width="26" height="26" rx="5"/>
      </g>
      <path class="pa-float" d="M470 250 C420 240 400 195 405 150 C455 158 485 195 480 245 Z" fill="${c}"/>
      <path d="M472 250 C472 210 455 180 425 160" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M60 520 H540" stroke="${c}" stroke-width="10" stroke-linecap="round"/>
      ${bigNum(430, 110, "11", 110, c + "33")}`);
  },

  /* 12 · Responsible Consumption — recycle loop */
  12(c) {
    const arc = (rot) => `<g transform="rotate(${rot} 300 300)"><path d="M300 160 A140 140 0 0 1 421 230" fill="none" stroke="${c}" stroke-width="26" stroke-linecap="round"/><path d="M421 230 l-38 -6 l8 -36 z" fill="${c}" transform="rotate(24 421 230)"/></g>`;
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <g class="pa-spin" style="transform-origin:300px 300px">${arc(0) + arc(120) + arc(240)}</g>
      <circle cx="300" cy="300" r="70" fill="${c}1f"/>
      ${bigNum(235, 335, "12", 84, c)}
      ${dotsGrid(80, 80, 4, 3, 40, 6, c + "55")}
      ${dotsGrid(440, 470, 4, 3, 40, 6, c + "55")}`);
  },

  /* 13 · Climate Action — thermometer earth */
  13(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <circle cx="270" cy="330" r="160" fill="${c}"/>
      <path d="M170 280 q40 -35 80 -10 q45 30 85 -5 q30 -25 60 0" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M180 400 q50 25 110 0 q40 -18 80 8" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>
      <rect x="420" y="120" width="64" height="330" rx="32" fill="#fff" stroke="${INK}" stroke-width="8"/>
      <rect x="436" y="240" width="32" height="190" rx="16" fill="#E5243B"/>
      <circle cx="452" cy="440" r="34" fill="#E5243B"/>
      <path class="pa-rise" d="M452 400 V260" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".5"/>
      ${bigNum(80, 150, "13", 120, c + "33")}
      ${dotsGrid(90, 520, 8, 2, 44, 6, c + "55")}`);
  },

  /* 14 · Life Below Water — waves + fish */
  14(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <path d="M0 260 Q75 215 150 260 T300 260 T450 260 T600 260 V600 H0 Z" fill="${c}2e"/>
      <path d="M0 330 Q75 285 150 330 T300 330 T450 330 T600 330 V600 H0 Z" fill="${c}77"/>
      <path d="M0 400 Q75 355 150 400 T300 400 T450 400 T600 400 V600 H0 Z" fill="${c}"/>
      <g class="pa-swim">
        <path d="M180 470 q45 -34 90 0 q-45 34 -90 0 z" fill="#fff"/>
        <path d="M180 470 l-30 -20 v40 z" fill="#fff"/>
        <circle cx="245" cy="464" r="5" fill="${c}"/>
      </g>
      <circle cx="430" cy="150" r="52" fill="#FFD24A"/>
      ${bigNum(60, 170, "14", 130, c + "33")}
      ${dotsGrid(470, 240, 3, 3, 36, 7, "#fff")}`);
  },

  /* 15 · Life On Land — layered forest */
  15(c) {
    const tree = (x, y, s, col) => `<path d="M${x} ${y - 120 * s} L${x + 62 * s} ${y - 26 * s} L${x + 34 * s} ${y - 26 * s} L${x + 82 * s} ${y + 34 * s} L${x - 82 * s} ${y + 34 * s} L${x - 34 * s} ${y - 26 * s} L${x - 62 * s} ${y - 26 * s} Z" fill="${col}"/><rect x="${x - 10 * s}" y="${y + 30 * s}" width="${20 * s}" height="${44 * s}" rx="6" fill="${col}"/>`;
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <circle cx="470" cy="130" r="60" fill="${c}26"/>
      ${tree(150, 340, 1.05, c + "55")}
      ${tree(310, 300, 1.35, c)}
      ${tree(460, 350, 0.95, c + "88")}
      <path d="M40 480 Q300 430 560 480" stroke="${c}" stroke-width="12" fill="none" stroke-linecap="round"/>
      <path d="M40 520 Q300 475 560 520" stroke="${c}66" stroke-width="10" fill="none" stroke-linecap="round"/>
      ${bigNum(70, 170, "15", 130, c + "33")}
      ${dotsGrid(80, 550, 10, 2, 46, 5, c + "55")}`);
  },

  /* 16 · Peace & Justice — dove + scale column */
  16(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      ${ring(300, 300, 210, c + "33", 6)}
      ${ring(300, 300, 250, c + "1a", 4, "6 22")}
      <path class="pa-float" d="M210 330 C230 270 290 240 350 250 C400 258 430 240 450 215 C448 265 425 300 385 318 C420 330 445 355 455 385 C400 372 350 372 305 388 C265 402 235 385 210 330 Z" fill="${c}"/>
      <circle cx="352" cy="262" r="7" fill="#fff"/>
      <path d="M385 245 l40 -18 l-6 30 z" fill="${c}99"/>
      <path d="M150 470 H450" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
      <rect x="180" y="430" width="24" height="40" fill="${INK}"/>
      <rect x="288" y="430" width="24" height="40" fill="${INK}"/>
      <rect x="396" y="430" width="24" height="40" fill="${INK}"/>
      ${bigNum(80, 140, "16", 120, c + "33")}
      ${dotsGrid(430, 90, 4, 3, 38, 6, c + "55")}`);
  },

  /* 17 · Partnerships — linked rings + globe grid */
  17(c) {
    return svgWrap(`
      <rect width="600" height="600" fill="#fff"/>
      <g fill="none" stroke="${c}3d" stroke-width="4">
        ${ring(300, 300, 190, c + "3d", 4)}
        <ellipse cx="300" cy="300" rx="90" ry="190"/>
        <path d="M110 300 H490 M140 190 H460 M140 410 H460"/>
      </g>
      <g class="pa-link">
        <circle cx="215" cy="300" r="62" fill="none" stroke="${c}" stroke-width="20"/>
        <circle cx="385" cy="300" r="62" fill="none" stroke="${INK}" stroke-width="20"/>
      </g>
      ${bigNum(390, 150, "17", 130, c + "33")}
      ${dotsGrid(80, 470, 5, 3, 40, 6, c + "55")}`);
  },
};
