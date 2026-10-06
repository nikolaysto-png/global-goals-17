/* ============================================================
   GLOBAL GOALS · 17 — interaction engine
   Poster wall, colour-takeover viewer, quiz, pledges, confetti.
   All motion is soft, springy and deliberate.
   ============================================================ */
"use strict";

const $  = (s, p) => (p || document).querySelector(s);
const $$ = (s, p) => [...(p || document).querySelectorAll(s)];
const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---- theme groupings (the UN "5 Ps") ---- */
const THEMES = [
  { id:"all",         label:"All goals",   color:"#0F1420" },
  { id:"people",      label:"People",      color:"#E5243B", nums:[1,2,3,4,5] },
  { id:"planet",      label:"Planet",      color:"#107E41", nums:[6,13,14,15] },
  { id:"prosperity",  label:"Prosperity",  color:"#DDA63A", nums:[7,8,9,10,11,12] },
  { id:"peace",       label:"Peace",       color:"#00689D", nums:[16] },
  { id:"partnership", label:"Partnership", color:"#19486A", nums:[17] },
];
const themeOf = n => THEMES.find(t => t.nums && t.nums.includes(n));

/* ============================================================
   1 · BUILD THE POSTER WALL
   ============================================================ */
function wirePosterTilt(el){
  let raf = null;
  el.addEventListener("pointermove", e => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      el.style.transform = `perspective(700px) rotateY(${x*7}deg) rotateX(${-y*7}deg) translateY(-6px) scale(1.02)`;
      el.querySelectorAll(".poster__layer").forEach(l =>
        l.style.translate = `${x*-10}px ${y*-10}px`);
      raf = null;
    });
  });
  el.addEventListener("pointerleave", () => {
    el.style.transform = "";
    el.querySelectorAll(".poster__layer").forEach(l => l.style.translate = "");
  });
}
const CAN_TILT = !REDUCED && matchMedia("(hover:hover)").matches;

const grid = $("#posterGrid");
SDG_GOALS.forEach(g => {
  const t = themeOf(g.num);
  const el = document.createElement("button");
  el.className = "poster";
  el.style.setProperty("--c", g.color);
  el.dataset.num = g.num;
  el.dataset.theme = t ? t.id : "";
  el.dataset.search = `${g.num} ${g.title} ${g.tagline} ${g.desc}`.toLowerCase();
  el.setAttribute("aria-label", `Open Goal ${g.num}: ${g.title}`);
  el.innerHTML = `
    <span class="poster__badge">${g.num}</span>
    <div class="poster__art poster__layer">${POSTERS[g.num](g.color)}</div>
    <div class="poster__foot">
      <span class="poster__cat">${t ? t.label : "Global Goal"}</span>
      <span class="poster__title">${g.title}</span>
    </div>
    <span class="poster__go poster__layer">→</span>`;
  el.addEventListener("click", () => openViewer(g.num));
  if (CAN_TILT) wirePosterTilt(el);
  grid.appendChild(el);
});

/* staggered scroll reveal for posters + generic reveals */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    const el = en.target;
    const delay = el.classList.contains("poster")
      ? (parseInt(el.dataset.num, 10) % 4) * 90 : 0;
    setTimeout(() => el.classList.add("is-in"), delay);
    io.unobserve(el);
  });
}, { threshold:.12, rootMargin:"0px 0px -40px 0px" });
$$(".poster,.reveal,.pyr,.tl-item").forEach(el => io.observe(el));

/* ============================================================
   2 · SEARCH + THEME FILTERS
   ============================================================ */
const chipsBox = $("#themeChips");
THEMES.forEach((t, i) => {
  const b = document.createElement("button");
  b.className = "chip" + (i === 0 ? " is-on" : "");
  b.style.setProperty("--c", t.color);
  b.dataset.id = t.id;
  b.innerHTML = `<span class="dot"></span>${t.label}`;
  b.onclick = () => {
    $$(".chip").forEach(c => c.classList.remove("is-on"));
    b.classList.add("is-on");
    applyFilters();
  };
  chipsBox.appendChild(b);
});

const searchInput = $("#searchInput");
function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const activeTheme = $(".chip.is-on").dataset.id;
  let visible = 0;
  $$(".poster").forEach(p => {
    const okQ = !q || p.dataset.search.includes(q);
    const okT = activeTheme === "all" || p.dataset.theme === activeTheme;
    const show = okQ && okT;
    p.classList.toggle("is-hidden", !show);
    if (show) { visible++; p.classList.add("is-in"); }
  });
  $("#wallEmpty").hidden = visible > 0;
}
searchInput.addEventListener("input", applyFilters);
$("#resetSearch").onclick = () => { searchInput.value = ""; applyFilters(); };

/* ============================================================
   3 · HERO TICKER (goal chips marquee)
   ============================================================ */
const track = $("#tickerTrack");
const tickHTML = SDG_GOALS.map(g =>
  `<span class="tick-chip" data-num="${g.num}"><b style="background:${g.color}">${g.num}</b>${g.title}</span>`).join("");
track.innerHTML = tickHTML + tickHTML; /* seamless loop */
track.addEventListener("click", e => {
  const chip = e.target.closest(".tick-chip");
  if (chip) openViewer(+chip.dataset.num);
});

/* ============================================================
   4 · COUNT-UP NUMBERS
   ============================================================ */
function countUp(el){
  const target = +el.dataset.count, plain = el.hasAttribute("data-plain");
  const dur = 1400, t0 = performance.now();
  (function step(now){
    const k = Math.min((now - t0) / dur, 1);
    const v = Math.round(target * (1 - Math.pow(1 - k, 3)));
    el.textContent = plain ? v : v.toLocaleString();
    if (k < 1) requestAnimationFrame(step);
  })(t0);
}
const numIO = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { countUp(e.target); numIO.unobserve(e.target); }
}), { threshold:.6 });
$$("[data-count]").forEach(el => numIO.observe(el));

/* ============================================================
   5 · VIEWER — the full-screen poster takeover
   ============================================================ */
const viewer = $("#viewer"), vBody = $("#viewerBody"), vIdx = $("#vIdxNum");
let current = 1, lastFocus = null;

function goalByNum(n){ return SDG_GOALS.find(g => g.num === n); }

function renderViewer(n){
  const g = goalByNum(n), t = themeOf(n);
  current = n;
  vIdx.textContent = n;
  viewer.style.setProperty("--c", g.color);
  /* alternate layout so each goal feels like a different world */
  vBody.classList.toggle("flip", n % 2 === 0);
  vBody.innerHTML = `
    <section class="vhero">
      <span class="vhero__ghost">${n}</span>
      <span class="vhero__cat">${t ? t.label : ""} · Global Goal</span>
      <h2 class="vhero__num">${String(n).padStart(2,"0")}</h2>
      <h3 class="vhero__title">${g.title}</h3>
      <p class="vhero__tag">${g.tagline}</p>
      <div class="vhero__art">${POSTERS[n](g.color)}</div>
    </section>
    <section class="vpanel">
      <div class="vstats">${g.stats.map(s =>
        `<div class="vstat"><b>${s.v}</b><span>${s.l}</span></div>`).join("")}</div>
      <p class="vdesc">${g.desc}</p>
      <div class="vtargets">
        <h4>Key targets</h4>
        ${g.targets.map(x => {
          const m = x.match(/\((\d+\.[^\)]+)\)$/);
          const code = m ? `<code>${m[1]}</code> ` : "";
          const txt = m ? x.slice(0, m.index) : x;
          return `<div class="vtarget"><i>${n}</i><span>${code}${txt}</span></div>`;
        }).join("")}
      </div>
    </section>`;
  /* stagger targets in */
  $$(".vtarget", vBody).forEach((el, i) => setTimeout(() => el.classList.add("is-in"), 120 + i * 80));
  /* re-trigger soft slide on goal change */
  const card = $("#viewerCard");
  card.classList.remove("vpop"); void card.offsetWidth;
  if (!REDUCED) card.classList.add("vpop");
}

function openViewer(n){
  lastFocus = document.activeElement;
  renderViewer(n);
  viewer.classList.add("is-open");
  viewer.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  $("#viewerClose").focus({ preventScroll:true });
}
function closeViewer(){
  viewer.classList.remove("is-open");
  viewer.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
  if (lastFocus) lastFocus.focus({ preventScroll:true });
}
$("#viewerClose").onclick = closeViewer;
$("#viewerScrim").onclick = closeViewer;
$("#prevGoal").onclick = () => renderViewer(((current - 2 + 17) % 17) + 1);
$("#nextGoal").onclick = () => renderViewer(current % 17 + 1);
document.addEventListener("keydown", e => {
  if (!viewer.classList.contains("is-open")) return;
  if (e.key === "Escape") closeViewer();
  if (e.key === "ArrowRight") $("#nextGoal").click();
  if (e.key === "ArrowLeft")  $("#prevGoal").click();
});

/* ============================================================
   6 · QUIZ — which goal needs you?
   ============================================================ */
const QUIZ = [
  { q:"It's Sunday afternoon. What quietly makes you angry?", opts:[
    { e:"🍽️", t:"Kids going hungry next to wasted food", w:[2,12] },
    { e:"🌡️", t:"Another record-hot summer on the news",  w:[13,7] },
    { e:"🏫", t:"Talented kids who never get to school",  w:[4,10] },
    { e:"🐢", t:"Beaches choked with plastic",            w:[14,15] },
  ]},
  { q:"You get one superpower for a day. Pick:", opts:[
    { e:"🩺", t:"Healing anyone, anywhere",              w:[3,6] },
    { e:"⚖️", t:"Making any system treat people fair",   w:[5,16,10] },
    { e:"💡", t:"Inventing one thing that changes all",  w:[9,7,8] },
    { e:"🤝", t:"Getting rivals to actually agree",      w:[16,17,1] },
  ]},
  { q:"Your ideal weekend project?", opts:[
    { e:"🌱", t:"Community garden or river clean-up",      w:[15,14,6] },
    { e:"📣", t:"Campaigning for someone's rights",        w:[5,16,10] },
    { e:"🛠️", t:"Building tools that help small business", w:[8,9,1] },
    { e:"🎓", t:"Tutoring / teaching something you know",  w:[4,3,5] },
  ]},
];
const quizBody = $("#quizBody");
let answers = [];

function renderQuiz(){
  quizBody.innerHTML = `
    <div class="quiz-progress" style="--c:#26B88B">
      ${QUIZ.map((_,i)=>`<i class="${i < answers.length ? "done":""}"></i>`).join("")}
    </div>
    ${answers.length < QUIZ.length ? `
      <p class="quiz-q">${QUIZ[answers.length].q}</p>
      <div class="quiz-opts">
        ${QUIZ[answers.length].opts.map((o,i)=>`
          <button class="quiz-opt" data-i="${i}" style="--c:${["#E5243B","#26BDE2","#DDA63A","#107E41"][i]}">
            <span class="eo">${o.e}</span>${o.t}
          </button>`).join("")}
      </div>` : quizResult()}`;
  $$(".quiz-opt", quizBody).forEach(b => b.onclick = () => {
    answers.push(QUIZ[answers.length].opts[+b.dataset.i]);
    renderQuiz();
  });
  const restart = $(".quiz-restart", quizBody);
  if (restart) restart.onclick = () => { answers = []; renderQuiz(); };
  const openBtn = $(".quiz-open", quizBody);
  if (openBtn) openBtn.onclick = () => openViewer(+openBtn.dataset.num);
}
function quizResult(){
  const score = {};
  answers.forEach(a => a.w.forEach((n,idx) => score[n] = (score[n]||0) + (4-idx)));
  const win = Object.entries(score).sort((a,b)=>b[1]-a[1])[0][0]|0;
  const g = goalByNum(win);
  return `
    <div class="quiz-result">
      <div class="quiz-result__art">${POSTERS[win](g.color)}</div>
      <div>
        <h3 style="color:${g.color}">Goal ${win} — ${g.title}</h3>
        <p>${g.tagline}</p>
        <button class="btn btn--solid quiz-open" data-num="${win}" style="--c:${g.color};padding:11px 20px;font-size:14.5px">See this world →</button>
        <br><button class="quiz-restart">↺ retake the quiz</button>
      </div>
    </div>`;
}
renderQuiz();

/* ============================================================
   7 · PLEDGES + CONFETTI
   ============================================================ */
const COLORS = SDG_GOALS.map(g => g.color);
let pledges = +(localStorage.getItem("gg17-pledges") || 1240);
const SEEDS = ["Maya 🇧🇷","Ken 🇯🇵","Amara 🇳🇬","Luca 🇮🇹","Priya 🇮🇳","Noor 🇯🇴"];
$("#pledgeNumTop").textContent = pledges.toLocaleString();
$("#pledgeWall").innerHTML = SEEDS.map((s,i) =>
  `<span class="pw-chip" style="--c:${COLORS[i*2]}"><b>✦</b> ${s}</span>`).join("");

function pledge(goalNum){
  pledges++;
  localStorage.setItem("gg17-pledges", pledges);
  $("#pledgeNumTop").textContent = pledges.toLocaleString();
  const pill = $("#pledgeCount");
  pill.classList.remove("is-bumped"); void pill.offsetWidth; pill.classList.add("is-bumped");
  const g = goalByNum(goalNum || 17);
  const name = ($("#pledgeName").value.trim() || "Anonymous hero").slice(0,24);
  $("#pledgeStatus").textContent =
    `✦ Signed! ${name} now stands behind Goal ${g.num} — ${g.title}.`;
  const chip = document.createElement("span");
  chip.className = "pw-chip"; chip.style.setProperty("--c", g.color);
  chip.innerHTML = `<b>✦</b> ${name} · #${g.num}`;
  $("#pledgeWall").prepend(chip);
  burstAt(window.innerWidth/2, window.innerHeight*.35);
}
$("#pledgeBtn").onclick = () => {
  pledge(viewer.classList.contains("is-open") ? current : 17);
  $("#pledgeName").value = "";
};
$("#viewerPledge").onclick = () => pledge(current);

/* confetti — canvas, 17 official colours */
const cvs = $("#confetti"), ctx = cvs.getContext("2d");
let parts = [], confRAF = null;
function sizeC(){ cvs.width = innerWidth * devicePixelRatio; cvs.height = innerHeight * devicePixelRatio; }
sizeC(); addEventListener("resize", sizeC);
function burstAt(x, y){
  if (REDUCED) return;
  for (let i = 0; i < 90; i++){
    const a = Math.random() * Math.PI * 2, sp = 4 + Math.random() * 11;
    parts.push({ x, y, vx:Math.cos(a)*sp, vy:Math.sin(a)*sp - 6, g:.22,
      s:5 + Math.random()*7, rot:Math.random()*6, vr:(Math.random()-.5)*.35,
      c:COLORS[i % 17], life:120 + Math.random()*40 });
  }
  if (!confRAF) confRAF = requestAnimationFrame(confStep);
}
function confStep(){
  ctx.clearRect(0,0,cvs.width,cvs.height);
  parts = parts.filter(p => p.life-- > 0);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += p.g; p.vx *= .99; p.rot += p.vr;
    ctx.save(); ctx.translate(p.x*devicePixelRatio, p.y*devicePixelRatio);
    ctx.rotate(p.rot); ctx.fillStyle = p.c; ctx.globalAlpha = Math.min(1, p.life/40);
    ctx.fillRect(-p.s/2, -p.s/2, p.s, p.s*.6); ctx.restore();
  });
  confRAF = parts.length ? requestAnimationFrame(confStep) : null;
}

/* ============================================================
   8 · SURPRISE ME
   ============================================================ */
function surprise(){
  let n; do { n = 1 + Math.floor(Math.random()*17); } while (n === current);
  openViewer(n);
}
$("#surpriseBtn").onclick = surprise;
$("#surpriseBtn2").onclick = surprise;

/* ============================================================
   9 · ABOUT — 5 Ps pyramid + timeline
   ============================================================ */
const PS = [
  { p:"People",      c:"#E5243B", d:"Ending poverty & hunger, dignity for all." },
  { p:"Planet",      c:"#107E41", d:"Protecting climate, oceans & ecosystems." },
  { p:"Prosperity",  c:"#DDA63A", d:"Jobs, energy & cities that work for everyone." },
  { p:"Peace",       c:"#00689D", d:"Just institutions & inclusive societies." },
  { p:"Partnership", c:"#19486A", d:"Global cooperation to deliver it all." },
];
$("#pyramid").innerHTML = PS.map(x =>
  `<div class="pyr" style="--c:${x.c}"><b>${x.p[0]}</b><span><strong>${x.p}</strong> — ${x.d}</span></div>`).join("");

const TL = [
  { y:1945, c:"#19486A", t:"The United Nations is founded — 51 member states sign the Charter." },
  { y:1948, c:"#E5243B", t:"Universal Declaration of Human Rights adopted." },
  { y:1972, c:"#107E41", t:"First global summit on the environment, Stockholm." },
  { y:1987, c:"#26B88B", t:"“Our Common Future” defines sustainable development." },
  { y:2000, c:"#FD6925", t:"Millennium Development Goals — 8 goals, 2000–2015." },
  { y:2015, c:"#FCC30B", t:"193 states adopt the 17 Sustainable Development Goals." },
  { y:2019, c:"#26BDE2", t:"UN Decade of Action announced — delivery mode on." },
  { y:2023, c:"#00689D", t:"SDG Summit mid-term review accelerates the agenda." },
  { y:2026, c:"#FF3A2C", t:"You are here. Four years to go.", now:true },
  { y:2030, c:"#A21942", t:"The deadline. The world agreed: leave no one behind." },
];
$("#timeline").innerHTML = TL.map(x =>
  `<li class="tl-item" style="--c:${x.c}"><span class="tl-year">${x.y}</span><p>${x.t}${x.now?' <span class="tl-now">● live</span>':""}</p></li>`).join("");
$$("#timeline .tl-item, #pyramid .pyr").forEach(el => io.observe(el));

/* ============================================================
   10 · NAV STATE + PROGRESS RAIL + MAGNETIC BUTTONS
   ============================================================ */
const nav = $("#nav"), fill = $("#scrollFill");
addEventListener("scroll", () => {
  const h = document.documentElement;
  fill.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + "%";
  nav.classList.toggle("is-stuck", h.scrollTop > 24);
  let cur = "";
  for (const sec of ["goals","action","about"]) {
    const el = document.getElementById(sec);
    if (el && el.getBoundingClientRect().top < innerHeight * .45) cur = sec;
  }
  $$("#navLinks a").forEach(a => a.classList.toggle("is-active", a.dataset.sec === cur));
}, { passive:true });

if (CAN_TILT)
  $$(".magnetic").forEach(b => {
    b.addEventListener("pointermove", e => {
      const r = b.getBoundingClientRect();
      b.style.translate = `${(e.clientX-r.left-r.width/2)*.22}px ${(e.clientY-r.top-r.height/2)*.3}px`;
    });
    b.addEventListener("pointerleave", () => b.style.translate = "");
  });

/* deep link: #goal-14 opens the viewer directly */
function fromHash(){
  const m = location.hash.match(/^goal-(\d{1,2})$/);
  if (m && goalByNum(+m[1])) openViewer(+m[1]);
}
addEventListener("hashchange", fromHash); fromHash();
