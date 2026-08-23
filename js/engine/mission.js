/* ============================================================
   MISSION — mission view, assembly console, compile & results.

   Difficulty contract (see README):
   - Options are shuffled every render (position is never a tell).
   - The content contract guarantees length is never a tell either.
   - GATE: a CHAOS run (tier "bad") does NOT unlock the next
     mission — the operative must re-run (fresh shuffle).
   - XP is granted ONCE per mission, on the first passing run.
   - AVG SYNC on the certificate = best sync per mission.
   ============================================================ */
import { getState, save } from "./state.js";
import { scoreRun, mayAdvance, rankFor, XP_PER_POINT } from "./scoring.js";
import { $, esc, toast, shuffle, updateHUD, renderCodex, streamText, showCert } from "./ui.js";
import { SFX } from "./audio.js";
import { burst, burstAt } from "./fx.js";

let sel = {};          // slotId -> option index (within shuffled _opts)
let activeSlot = null; // slot currently shown in the component shelf
let locked = false;    // true while a compile/result is on screen

const LETTERS = ["A", "B", "C", "D", "E", "F"];

/* ---------------- transition ---------------- */
export function stampTo(idx, course){
  const m = course.missions[idx];
  $("#stampIn").innerHTML = `<div class="st-code">INCOMING MISSION · ${esc(m.code)} / ${String(course.missions.length).padStart(2, "0")}</div>
    <div class="st-name">${esc(m.name)}</div><div class="st-skill">SKILL: ${esc(m.skill)}</div>`;
  $("#stamp").classList.add("on");
  setTimeout(() => {
    getState().mi = idx; save();
    renderMission(course);
    setTimeout(() => $("#stamp").classList.remove("on"), 420);
  }, 950);
}

/* ---------------- mission view ---------------- */
export function renderMission(course){
  const S = getState();
  const m = course.missions[S.mi];
  sel = {}; locked = false; activeSlot = m.slots[0].id;
  m.slots.forEach(s => s._opts = shuffle(s.options));

  $("#missionView").innerHTML = `
  <div class="mhead">
    <div class="ghost">${esc(m.code)}</div>
    <div class="mmeta">
      <div class="mcode">${esc(m.code)} / ${String(course.missions.length).padStart(2, "0")} · MISSION BRIEF · OPERATIVE: ${esc(S.codename)}</div>
      <h1 class="mname">${esc(m.name)}</h1>
      <div class="mskill">SKILL TRAINED — ${esc(m.skill)}</div>
    </div>
  </div>
  <div class="mgrid">
    <aside class="panel cyan">
      <div class="ptitle">MISSION BRIEF</div>
      <div class="brief-body">
        <p class="obj">${m.brief.obj}</p>
        <div><div class="ptitle" style="padding:0 0 .5rem">PROVIDED DATA</div><div class="datablock">${esc(m.brief.data)}</div></div>
        <p class="fnote"><b>FIELD NOTE ▸</b> ${m.brief.note}</p>
        <div><div class="ptitle" style="padding:0 0 .5rem">SUCCESS CRITERIA</div>
          <div class="criteria">${m.brief.criteria.map(c => `<span class="chip">✓ ${esc(c)}</span>`).join("")}</div></div>
      </div>
    </aside>
    <section class="panel">
      <div class="ptitle">PROMPT ASSEMBLY CONSOLE</div>
      <div class="console">
        <div id="slots">${m.slots.map(s => `
          <div class="slot" data-slot="${esc(s.id)}">
            <div class="slab"><i></i>${esc(s.label)}</div>
            <div class="sval empty" id="sv-${esc(s.id)}">// awaiting component…</div>
          </div>`).join("")}
        </div>
        <div class="deckhead"><span id="deckTitle">COMPONENT SHELF</span><span>select a component · click again to replace</span></div>
        <div class="deck" id="deck"></div>
        <div class="runwrap"><button class="btn btn-primary btn-wide" id="runBtn">⚡ Compile &amp; Run Prompt</button></div>
      </div>
      <div id="result" class="hidden"></div>
    </section>
  </div>`;

  document.querySelectorAll(".slot").forEach(el => el.addEventListener("click", () => {
    if(locked) return;
    activeSlot = el.dataset.slot; SFX.select(); paintActive(); renderDeck(course);
  }));
  $("#runBtn").addEventListener("click", () => compile(course));
  paintActive(); renderDeck(course); updateHUD(course);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function paintActive(){
  document.querySelectorAll(".slot").forEach(el => el.classList.toggle("active", el.dataset.slot === activeSlot));
}

function renderDeck(course){
  const m = course.missions[getState().mi];
  const slot = m.slots.find(s => s.id === activeSlot);
  $("#deckTitle").textContent = "COMPONENT SHELF — " + slot.label;
  $("#deck").innerHTML = slot._opts.map((o, i) => {
    const picked = sel[slot.id] === i;
    const cls = "optcard" + (picked ? " picked" : "") + (locked ? (picked ? " reveal-" + o.q : " dimmed") : "");
    return `<button class="${cls}" data-i="${i}"><span class="let">${LETTERS[i]}</span><span>${esc(o.t)}</span></button>`;
  }).join("");
  document.querySelectorAll("#deck .optcard").forEach(el => el.addEventListener("click", () => {
    if(locked) return;
    const i = +el.dataset.i, had = sel[slot.id] !== undefined;
    sel[slot.id] = i;
    had ? SFX.swap() : SFX.insert();
    const sv = $("#sv-" + slot.id);
    sv.textContent = slot._opts[i].t; sv.classList.remove("empty");
    document.querySelector(`.slot[data-slot="${slot.id}"]`).classList.add("filled");
    burstAt(el, had ? "255,179,71" : "65,224,200");
    renderDeck(course);
  }));
}

/* ---------------- compile & result ---------------- */
function compile(course){
  if(locked) return;
  const S = getState();
  const m = course.missions[S.mi];
  const missing = m.slots.filter(s => sel[s.id] === undefined);
  if(missing.length){
    SFX.err(); toast("⚠ ALL " + m.slots.length + " SLOTS REQUIRED — " + missing[0].label + " EMPTY", true);
    document.querySelector(`.slot[data-slot="${missing[0].id}"]`).classList.add("active");
    return;
  }
  locked = true;
  const btn = $("#runBtn"); btn.disabled = true; btn.classList.add("charging"); btn.textContent = "COMPILING…";
  SFX.run();
  setTimeout(() => { btn.classList.remove("charging"); showResult(course, m); }, 950);
}

function showResult(course, m){
  const S = getState();
  const run = scoreRun(m.slots, sel);
  const advance = mayAdvance(run);
  const firstPass = advance && !S.granted[S.mi];
  const gain = firstPass ? run.pts * XP_PER_POINT : 0;

  const tierName = { good: "FLAWLESS OUTPUT", mid: "PARTIAL SYNC", bad: "CHAOS OUTPUT" }[run.tier];
  S.syncs[S.mi] = Math.max(S.syncs[S.mi] ?? 0, run.sync);

  const rows = m.slots.map(s => ({ slot: s, opt: s._opts[sel[s.id]] }));
  rows.forEach(r => {
    const b = document.createElement("span");
    b.className = "qbadge qb" + r.opt.q;
    b.textContent = ["✗ ANTI-PATTERN", "△ PASSABLE", "✓ MASTER"][r.opt.q];
    document.querySelector(`.slot[data-slot="${r.slot.id}"]`).appendChild(b);
  });
  renderDeck(course);

  if(advance){
    S.cleared[S.mi] = true;
    if(firstPass){ S.granted[S.mi] = true; }
    if(!S.unlocked.includes(m.code)){ S.unlocked.push(m.code); renderCodex(course); }
  }
  save();

  const last = S.mi === course.missions.length - 1;
  const next = course.missions[S.mi + 1];
  const verdictMsg = !advance
    ? "OUTPUT REJECTED — 0 XP GRANTED · RE-RUN REQUIRED"
    : firstPass ? "XP GRANTED — " + (run.tier === "good" ? "EXEMPLARY. THAT PROMPT IS PRODUCTION-READY." : "FUNCTIONAL. TIGHTEN EVERY SLOT FOR A FLAWLESS OUTPUT.")
    : "+0 XP — ALREADY GRANTED FOR THIS MISSION";

  const res = $("#result"); res.classList.remove("hidden");
  res.innerHTML = `
    <div class="tierrow"><span class="tier t-${run.tier}">${tierName}</span>
      <span class="tiersub">SYNC ${run.sync}% · ${run.pts}/${run.max} PTS · best: ${S.syncs[S.mi]}% · protocol "${esc(m.protocol.name)}" ${advance ? "recorded" : "NOT recorded"}</span></div>
    <div>
      <div class="ptitle" style="padding:0 0 .5rem">SIMULATED MODEL RESPONSE</div>
      <div class="outbox"><span id="otype"></span><span class="cursorblk"></span></div>
    </div>
    <div id="afterStream" class="hidden" style="display:flex;flex-direction:column;gap:1.2rem">
      <div><div class="ptitle" style="padding:0 0 .5rem">COMPONENT VERDICT</div>
        <div class="verdict">${rows.map((r, i) => `
          <div class="vrow" style="animation-delay:${i * .12}s">
            <div class="vs v${r.opt.q}">${["✗ ANTI", "△ PASS", "✓ MASTER"][r.opt.q]} · ${esc(r.slot.label)}</div>
            <div class="vt">“${esc(r.opt.t.length > 90 ? r.opt.t.slice(0, 90) + "…" : r.opt.t)}”<br><b>→</b> ${r.opt.why}</div>
          </div>`).join("")}
        </div></div>
      <div class="xpgrant ${advance ? "" : "reject"}"><span class="big" id="xpCount">+${gain}</span>${esc(verdictMsg)}</div>
      ${advance ? `
      <div class="lesson"><div class="ll">◆ PROTOCOL UNLOCKED — CODEX UPDATED</div>
        <h4>${esc(m.protocol.name)}</h4><p>${m.protocol.desc}</p></div>` : `
      <div class="lesson"><div class="ll">⚠ GATE ACTIVE — MISSION NOT CLEARED</div>
        <h4>The model mirrors your precision.</h4><p>Below half sync: the output is unusable. Study the verdicts, then re-run — the components will be reshuffled.</p></div>`}
      <div class="btnrow">
        ${advance
          ? `<button class="btn btn-primary" id="contBtn">${last ? "★ Claim Certification" : "Advance to " + esc(next.code) + " · " + esc(next.name) + " ▸"}</button>
             <button class="btn btn-ghost" id="replayBtn">↻ Re-run for mastery</button>`
          : `<button class="btn btn-danger btn-wide" id="rerunBtn">↻ Re-run Mission (components reshuffled)</button>`}
      </div>
    </div>`;

  setTimeout(() => res.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  streamText($("#otype"), m.outcomes[run.tier], () => {
    $("#afterStream").classList.remove("hidden");
    run.tier === "good" ? SFX.good() : run.tier === "mid" ? SFX.mid() : SFX.bad();

    const oldRank = rankFor(S.xp, course.ranks);
    if(firstPass){
      const t0 = performance.now(), dur = 900;
      (function cu(t){
        const k = Math.min(1, (t - t0) / dur);
        $("#xpCount").textContent = "+" + Math.round(gain * k);
        if(k < 1) requestAnimationFrame(cu);
      })(t0);
      S.xp += gain;
    }
    const newRank = rankFor(S.xp, course.ranks);
    updateHUD(course); save();
    if(newRank > oldRank){
      setTimeout(() => {
        $("#rankText").textContent = "RANK UP — " + course.ranks[newRank][1];
        const rf = $("#rankflash"); rf.classList.remove("on"); void rf.offsetWidth; rf.classList.add("on");
        SFX.rank(); burst(innerWidth / 2, innerHeight / 2, "255,179,71", 40);
      }, 1100);
    }

    if(advance){
      $("#contBtn").addEventListener("click", () => {
        SFX.insert();
        last ? showCert(course) : stampTo(S.mi + 1, course);
      });
      $("#replayBtn")?.addEventListener("click", () => { SFX.select(); renderMission(course); });
    }else{
      $("#rerunBtn").addEventListener("click", () => { SFX.select(); renderMission(course); });
    }
    setTimeout(() => $(".btnrow .btn")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100);
  });
}
