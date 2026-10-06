/* ============ SDG ATLAS — app.js ============ */
(() => {
"use strict";

const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Theme categories for filtering */
const THEME = {
  people:      [1,2,3,4,5,6],
  planet:      [6,13,14,15],
  prosperity:  [7,8,9,11,12],
  peace:       [16],
  partnership: [17]
};
const inTheme = (num, f) => f === "all" || (THEME[f] || []).includes(num);

/* =========================================================
   1. ANIMATED BACKGROUND — drifting goal-coloured particles
========================================================= */
(function bgParticles(){
  const cv = $("#bg-canvas"); if(!cv || reduceMotion) return;
  const ctx = cv.getContext("2d");
  let W, H, parts = [];
  const COLORS = SDG_GOALS.map(g => g.color);

  function resize(){
    W = cv.width = innerWidth * devicePixelRatio;
    H = cv.height = innerHeight * devicePixelRatio;
    cv.style.width = innerWidth + "px"; cv.style.height = innerHeight + "px";
  }
  resize(); addEventListener("resize", resize);

  const N = Math.min(70, Math.floor(innerWidth / 18));
  for(let i = 0; i < N; i++){
    parts.push({
      x: Math.random()*W, y: Math.random()*H,
      r: (Math.random()*2.2 + .6) * devicePixelRatio,
      vx: (Math.random()-.5)*.18*devicePixelRatio,
      vy: (Math.random()-.5)*.18*devicePixelRatio,
      c: COLORS[i % COLORS.length],
      a: Math.random()*.5 + .15
    });
  }
  function tick(){
    ctx.clearRect(0,0,W,H);
    for(const p of parts){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = W+20; if(p.x > W+20) p.x = -20;
      if(p.y < -20) p.y = H+20; if(p.y > H+20) p.y = -20;
      ctx.globalAlpha = p.a; ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
    }
    // connective lines
    ctx.globalAlpha = .06; ctx.strokeStyle = "#7fdcff"; ctx.lineWidth = devicePixelRatio*.6;
    const maxD = 130 * devicePixelRatio;
    for(let i = 0; i < parts.length; i++)
      for(let j = i+1; j < parts.length; j++){
        const dx = parts[i].x-parts[j].x, dy = parts[i].y-parts[j].y;
        if(dx*dx + dy*dy < maxD*maxD){
          ctx.beginPath(); ctx.moveTo(parts[i].x,parts[i].y); ctx.lineTo(parts[j].x,parts[j].y); ctx.stroke();
        }
      }
    requestAnimationFrame(tick);
  }
  tick();
})();

/* =========================================================
   2. CURSOR GLOW + MAGNETIC BUTTONS
========================================================= */
(function cursorAndMagnet(){
  const glow = $("#cursorGlow");
  if(glow && !reduceMotion && matchMedia("(hover:hover)").matches){
    let gx = -999, gy = -999, cx = -999, cy = -999;
    addEventListener("pointermove", e => { gx = e.clientX; gy = e.clientY; });
    (function loop(){
      cx += (gx-cx)*.08; cy += (gy-cy)*.08;
      glow.style.left = cx+"px"; glow.style.top = cy+"px";
      requestAnimationFrame(loop);
    })();
  }
  // magnetic buttons
  $$(".magnetic").forEach(el => {
    el.addEventListener("pointermove", e => {
      if(reduceMotion) return;
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width/2) * .25;
      const y = (e.clientY - r.top  - r.height/2) * .35;
      el.style.transform = `translate(${x}px,${y}px)`;
    });
    el.addEventListener("pointerleave", () => { el.style.transform = ""; });
  });
})();

/* =========================================================
   3. NAV — hide on scroll down / show on up + progress bar
========================================================= */
(function navBehaviour(){
  const nav = $("#nav"), fill = $("#scrollFill");
  let lastY = 0;
  addEventListener("scroll", () => {
    const y = scrollY, max = document.body.scrollHeight - innerHeight;
    fill.style.width = (max > 0 ? (y/max)*100 : 0) + "%";
    nav.classList.toggle("is-scrolled", y > 40);
    if(y > 300 && y > lastY) nav.classList.add("is-hidden");
    else nav.classList.remove("is-hidden");
    lastY = y;
  }, { passive:true });
})();

/* =========================================================
   4. REVEAL-ON-SCROLL (IntersectionObserver)
========================================================= */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add("is-visible"); revealIO.unobserve(en.target); }
  });
}, { threshold:.12 });
function observeReveals(root = document){ $$(".reveal:not(.is-visible)", root).forEach(el => revealIO.observe(el)); }

/* =========================================================
   5. HERO — entrance, count-up stats, marquee
========================================================= */
addEventListener("load", () => setTimeout(() => document.body.classList.add("loaded"), 80));

(function countUp(){
  const io = new IntersectionObserver(es => es.forEach(e => {
    if(!e.isIntersecting) return;
    io.unobserve(e.target);
    const target = +e.target.dataset.count, t0 = performance.now(), dur = 1600;
    (function step(t){
      const p = Math.min((t-t0)/dur, 1), eased = 1 - Math.pow(1-p, 4);
      e.target.textContent = Math.round(target*eased).toLocaleString();
      if(p < 1) requestAnimationFrame(step);
    })(t0);
  }), { threshold:.6 });
  $$(".hstat__num").forEach(el => io.observe(el));
})();

(function buildMarquee(){
  const track = $("#marqueeTrack");
  const chip = g => `<span class="mq-chip" data-goal="${g.num}" style="background:${g.color}cc"><b>${g.num}</b> ${g.title}</span>`;
  const html = SDG_GOALS.map(chip).join("");
  track.innerHTML = html + html; // duplicate for seamless loop
  track.addEventListener("click", e => {
    const c = e.target.closest(".mq-chip"); if(c) openModal(+c.dataset.goal);
  });
})();

/* =========================================================
   6. THE SDG WHEEL — draggable SVG wheel
========================================================= */
(function buildWheel(){
  const svg = $("#sdgWheel"); if(!svg) return;
  const NS = "http://www.w3.org/2000/svg";
  const CX = 260, CY = 260, R1 = 250, R0 = 118;
  const gap = .012; // radians between segments
  const group = document.createElementNS(NS,"g");
  svg.appendChild(group);

  function arcPath(a0, a1){
    const x0o = CX+R1*Math.cos(a0), y0o = CY+R1*Math.sin(a0);
    const x1o = CX+R1*Math.cos(a1), y1o = CY+R1*Math.sin(a1);
    const x0i = CX+R0*Math.cos(a1), y0i = CY+R0*Math.sin(a1);
    const x1i = CX+R0*Math.cos(a0), y1i = CY+R0*Math.sin(a0);
    const large = a1-a0 > Math.PI ? 1 : 0;
    return `M${x0o} ${y0o} A${R1} ${R1} 0 ${large} 1 ${x1o} ${y1o} L${x0i} ${y0i} A${R0} ${R0} 0 ${large} 0 ${x1i} ${y1i} Z`;
  }

  const step = (Math.PI*2)/17;
  SDG_GOALS.forEach((g,i) => {
    const a0 = i*step - Math.PI/2 + gap, a1 = (i+1)*step - Math.PI/2 - gap;
    const seg = document.createElementNS(NS,"g");
    seg.setAttribute("class","seg"); seg.dataset.goal = g.num;
    const path = document.createElementNS(NS,"path");
    path.setAttribute("d", arcPath(a0,a1));
    path.setAttribute("fill", g.color);
    seg.appendChild(path);
    // number label
    const mid = (a0+a1)/2, lr = (R0+R1)/2;
    const tx = CX + lr*Math.cos(mid), ty = CY + lr*Math.sin(mid);
    const t = document.createElementNS(NS,"text");
    t.setAttribute("x",tx); t.setAttribute("y",ty+6);
    t.setAttribute("text-anchor","middle"); t.setAttribute("font-size","20");
    t.setAttribute("fill","#fff"); t.textContent = g.num;
    seg.appendChild(t);
    seg.addEventListener("click", () => openModal(g.num));
    group.appendChild(seg);
  });

  const wNum = $("#wheelNum"), wTitle = $("#wheelTitle"), wTag = $("#wheelTag");
  $$(".seg", svg).forEach(seg => {
    seg.addEventListener("pointerenter", () => {
      const g = SDG_GOALS[+seg.dataset.goal - 1];
      wNum.textContent = g.num; wNum.style.color = g.color;
      wTitle.textContent = g.title; wTag.textContent = g.tagline;
      $$(".seg", svg).forEach(s => s.style.opacity = s === seg ? 1 : .35);
    });
  });
  svg.addEventListener("pointerleave", () => {
    wNum.textContent = "17"; wNum.style.color = ""; wTitle.textContent = "Goals";
    wTag.textContent = "Hover a segment · drag to spin · click to explore";
    $$(".seg", svg).forEach(s => s.style.opacity = 1);
  });
  wTag.textContent = "Hover a segment · drag to spin · click to explore";

  // Drag-to-spin with inertia
  let angle = 0, vel = 0, dragging = false, lastA = 0, touched = false;
  const setRot = () => group.setAttribute("transform", `rotate(${angle} ${CX} ${CY})`);
  const pointerAngle = e => Math.atan2(e.clientY - rect().top - CY*s, e.clientX - rect().left - CX*s);
  function rect(){ return svg.getBoundingClientRect(); }
  function scaleF(){ const r = rect(); return r.width/520; }
  let s = 1;
  const updScale = () => { s = scaleF(); };
  updScale(); addEventListener("resize", updScale);

  svg.addEventListener("pointerdown", e => {
    dragging = true; touched = true; vel = 0; lastA = pointerAngle(e); svg.setPointerCapture(e.pointerId);
  });
  svg.addEventListener("pointermove", e => {
    if(!dragging) return;
    const a = pointerAngle(e);
    let d = (a - lastA) * 180/Math.PI;
    if(d > 180) d -= 360; if(d < -180) d += 360;
    angle += d; vel = d; lastA = a; setRot();
  });
  const endDrag = () => dragging = false;
  svg.addEventListener("pointerup", endDrag);
  svg.addEventListener("pointercancel", endDrag);

  (function spin(){
    if(!dragging){
      if(Math.abs(vel) > .02){ angle += vel; vel *= .96; setRot(); }
      else if(!reduceMotion && autoSpinOk()){ angle += .05; setRot(); }
    }
    requestAnimationFrame(spin);
  })();
  function autoSpinOk(){ return !touched; }
})();

/* =========================================================
   7. GOAL GRID — tiles, tilt, search & filters
========================================================= */
(function buildGrid(){
  const grid = $("#goalGrid");
  grid.innerHTML = SDG_GOALS.map((g,i) => `
    <button class="goal-tile reveal" data-goal="${g.num}" data-theme="${g.num}"
            style="background:${g.color};transition-delay:${(i%6)*60}ms">
      <div><span class="goal-tile__num">Goal ${g.num}</span></div>
      <span class="goal-tile__icon">${g.icon}</span>
      <div>
        <div class="goal-tile__title">${g.title}</div>
        <div class="goal-tile__tag">${g.tagline}</div>
        <div class="goal-tile__more">Explore →</div>
      </div>
    </button>`).join("");

  const tiles = $$(".goal-tile", grid);
  observeReveals(grid);

  tiles.forEach(tile => {
    tile.addEventListener("click", () => openModal(+tile.dataset.goal));
    // spotlight + subtle 3D tilt
    tile.addEventListener("pointermove", e => {
      if(reduceMotion) return;
      const r = tile.getBoundingClientRect();
      const px = (e.clientX-r.left)/r.width, py = (e.clientY-r.top)/r.height;
      tile.style.setProperty("--mx", px*100+"%");
      tile.style.setProperty("--my", py*100+"%");
      tile.style.transform = `perspective(600px) rotateX(${(py-.5)*-7}deg) rotateY(${(px-.5)*7}deg) translateY(-6px) scale(1.02)`;
    });
    tile.addEventListener("pointerleave", () => { tile.style.transform = ""; });
  });

  // Filtering + search
  const search = $("#searchInput"), chips = $$(".chip"), emptyNote = $("#emptyNote");
  let activeFilter = "all";
  function apply(){
    const q = search.value.trim().toLowerCase();
    let shown = 0;
    tiles.forEach(t => {
      const g = SDG_GOALS[+t.dataset.goal-1];
      const hay = `${g.num} ${g.title} ${g.tagline} ${g.desc}`.toLowerCase();
      const ok = inTheme(g.num, activeFilter) && (!q || hay.includes(q));
      t.classList.toggle("is-hidden", !ok);
      if(ok){ shown++; t.classList.add("is-visible"); }
    });
    emptyNote.hidden = shown > 0;
  }
  search.addEventListener("input", apply);
  chips.forEach(c => c.addEventListener("click", () => {
    chips.forEach(x => x.classList.remove("is-active"));
    c.classList.add("is-active"); activeFilter = c.dataset.filter; apply();
  }));
})();

/* =========================================================
   8. TIMELINE
========================================================= */
(function buildTimeline(){
  const track = $("#timeline-track");
  const events = [
    { y:"1945", c:"#00689D", t:"The United Nations is founded — 51 member states pledge to save succeeding generations from the scourge of war." },
    { y:"1972", c:"#3F7E44", t:"Stockholm Conference: the first global meeting on the environment puts planetary limits on the agenda." },
    { y:"1987", c:"#94C800", t:"'Our Common Future' defines sustainable development — growth that meets needs today without stealing from tomorrow." },
    { y:"2000", c:"#E5243B", t:"The Millennium Development Goals set 8 targets for 2015, lifting a billion people out of extreme poverty." },
    { y:"2015", c:"#FCC30B", t:"All 193 UN Member States adopt the 2030 Agenda and its 17 Sustainable Development Goals." },
    { y:"2016", c:"#26B88B", t:"The Paris Agreement enters into force — climate action becomes embedded in Goal 13." },
    { y:"2020", c:"#FF3A2C", t:"A pandemic reverses decades of progress; inequality, health and education goals come under strain." },
    { y:"2022", c:"#26BDE2", t:"The SDG Summit gathers world leaders halfway to 2030 with an ambitious acceleration agenda." },
    { y:"2026", c:"#FD6925", t:"You are here. Only four years remain — and this interactive atlas is one small way to keep the promise alive." },
    { y:"2030", c:"#0693E3", t:"The deadline. The world's shared promise: no one left behind." }
  ];
  track.innerHTML = events.map(e => `
    <div class="tl-item" style="--dot:${e.c}">
      <div class="tl-item__year">${e.y}</div>
      <div class="tl-item__body"><p>${e.t}</p></div>
    </div>`).join("");
  const io = new IntersectionObserver(es => es.forEach(en => {
    if(en.isIntersecting){ en.target.classList.add("is-visible"); io.unobserve(en.target); }
  }), { threshold:.25 });
  $$(".tl-item", track).forEach(el => io.observe(el));
})();

/* =========================================================
   9. QUIZ — find your goal
========================================================= */
(function quiz(){
  const body = $("#quizBody"), bar = $("#quizBar");
  const questions = [
    { q:"It's Sunday morning. What makes you lose track of time?",
      a:[["Reading about space, tech or how things work",[9,7]],
         ["Volunteering at a shelter or community kitchen",[1,2]],
         ["Being outdoors — parks, rivers, trails",[14,15]],
         ["Debate, teamwork, helping friends sort problems",[5,16]]] },
    { q:"You're handed a megaphone for one minute. You shout about…",
      a:[["Clean air, clean water, a livable climate",[6,13]],
         ["Schools, hospitals and fair pay for everyone",[3,4,8]],
         ["Peace, justice and honest leaders",[16,10]],
         ["Countries and companies finally teaming up",[17,12]]] },
    { q:"Pick a superpower you'd actually use:",
      a:[["Heal any sick person with a touch",[3]],
         ["Make anyone understand any subject instantly",[4]],
         ["Turn any waste into something useful",[12,14]],
         ["Guarantee every child safety and a home",[1,11,16]]] }
  ];
  let stepN = 0, scores = {};

  function render(){
    if(stepN >= questions.length) return result();
    const Q = questions[stepN];
    bar.style.width = (stepN/questions.length)*100 + "%";
    body.innerHTML = `<div class="quiz__q">${stepN+1}. ${Q.q}</div>
      <div class="quiz__opts">${Q.a.map((x,i)=>`<button class="quiz__opt" data-i="${i}">${x[0]}</button>`).join("")}</div>`;
    $$(".quiz__opt", body).forEach(btn => btn.addEventListener("click", () => {
      Q.a[+btn.dataset.i][1].forEach(n => scores[n] = (scores[n]||0) + (questions.length - stepN));
      stepN++; render();
    }));
  }
  function result(){
    bar.style.width = "100%";
    const best = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
    const g = SDG_GOALS[best-1];
    body.innerHTML = `
      <div class="quiz__result">
        <div class="quiz__badge" style="background:${g.color}">${g.icon}</div>
        <div>
          <div style="font-size:.78rem;letter-spacing:.2em;text-transform:uppercase;color:${g.color}">Your goal</div>
          <div class="quiz__q" style="margin:6px 0 4px">Goal ${g.num} — ${g.title}</div>
          <p style="color:#c6cce4;font-size:.92rem;line-height:1.6">${g.tagline}</p>
          <button class="quiz__again" id="quizAgain">↺ Try again</button>
        </div>
      </div>`;
    $("#quizAgain").onclick = () => { stepN = 0; scores = {}; render(); };
    setTimeout(() => openModal(g.num, true), 1400);
  }
  render();
})();

/* =========================================================
   10. PLEDGE + CONFETTI
========================================================= */
(function pledge(){
  const btn = $("#pledgeBtn"), host = $("#confettiHost"), cnt = $("#pledgeCount");
  let n = 12847, done = false;
  btn.addEventListener("click", () => {
    if(done){ location.hash = "#action"; return; }
    done = true; n++;
    cnt.textContent = n.toLocaleString();
    btn.textContent = "🌟 Thank you, changemaker!";
    burst(host);
  });
  function burst(container){
    const colors = SDG_GOALS.map(g=>g.color);
    for(let i=0;i<90;i++){
      const s = document.createElement("span");
      s.className = "confetti";
      const ang = Math.random()*Math.PI*2, dist = 90 + Math.random()*220;
      s.style.background = colors[i%colors.length];
      s.style.setProperty("--cx", Math.cos(ang)*dist+"px");
      s.style.setProperty("--cy", Math.sin(ang)*dist - 60 + Math.random()*160+"px");
      s.style.setProperty("--cr", (Math.random()*720-360)+"deg");
      s.style.animationDelay = (Math.random()*.25)+"s";
      container.appendChild(s);
      setTimeout(()=>s.remove(), 1800);
    }
  }
})();

/* =========================================================
   11. MODAL
========================================================= */
const modal = $("#modal"), mAccent = $("#modalAccent"), mBody = $("#modalBody");
let lastFocus = null;
function openModal(num, gentle){
  const g = SDG_GOALS[num-1]; if(!g) return;
  lastFocus = document.activeElement;
  mAccent.style.background = `linear-gradient(90deg, ${g.color}, ${g.color}88)`;
  mBody.innerHTML = `
    <div class="m-head">
      <div class="m-num" style="background:${g.color}">${g.icon}</div>
      <div>
        <div class="m-title" style="color:${g.color}">Goal ${g.num} · ${g.title}</div>
        <div class="m-tag">${g.tagline}</div>
      </div>
    </div>
    <p class="m-desc">${g.desc}</p>
    <div class="m-stats">
      ${g.stats.map(s=>`<div class="m-stat"><b style="color:${g.color}">${s.v}</b><span>${s.l}</span></div>`).join("")}
    </div>
    <div class="m-targets">
      <h4>Key targets</h4>
      <ul>${g.targets.map(t=>`<li>${t}</li>`).join("")}</ul>
    </div>`;
  modal.classList.add("is-open"); modal.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  if(!gentle) $(".modal__close").focus();
}
function closeModal(){
  modal.classList.remove("is-open"); modal.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  if(lastFocus) lastFocus.focus();
}
modal.addEventListener("click", e => { if(e.target.closest("[data-close]")) closeModal(); });
addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

/* =========================================================
   12. SURPRISE ME + FOOTER COLOR BARS
========================================================= */
$("#surpriseBtn").addEventListener("click", () => {
  const g = SDG_GOALS[Math.floor(Math.random()*SDG_GOALS.length)];
  openModal(g.num);
});

(function footerColors(){
  $("#footerColors").innerHTML = SDG_GOALS.map(g=>`<i style="background:${g.color}" title="Goal ${g.num}: ${g.title}"></i>`).join("");
})();

/* Kick off reveals for static content */
observeReveals();

})();
