/* ============================================================
   UI — DOM helpers + HUD, codex drawer, certificate, toast.
   Course-agnostic: everything data-driven comes from (course, state).
   ============================================================ */
import { getState } from "./state.js";
import { rankFor } from "./scoring.js";
import { t, tf } from "./i18n.js";
import { burst } from "./fx.js";
import { SFX } from "./audio.js";

export const $ = s => document.querySelector(s);
export const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function toast(msg, err){
  const t = $("#toast"); t.textContent = msg; t.className = err ? "on err" : "on";
  clearTimeout(t._h); t._h = setTimeout(() => t.className = "", 2200);
}

export function shuffle(a){
  a = a.slice();
  for(let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function streamText(el, text, done){
  let i = 0; const step = text.length > 380 ? 3 : text.length > 180 ? 2 : 1;
  const iv = setInterval(() => {
    i += step; el.textContent = text.slice(0, i);
    if(i >= text.length){ clearInterval(iv); el.textContent = text; done(); }
  }, 16);
}

export function updateHUD(course){
  const S = getState();
  $("#xpVal").textContent = "XP " + String(S.xp).padStart(4, "0");
  const rank = rankFor(S.xp, course.ranks);
  const cur = course.ranks[rank][0], next = rank < course.ranks.length - 1 ? course.ranks[rank + 1][0] : cur;
  $("#xpFill").style.width = (rank >= course.ranks.length - 1 ? 100 : Math.min(100, (S.xp - cur) / (next - cur) * 100)) + "%";
  $("#rankChip").textContent = course.ranks[rank][1];
  $("#pips").innerHTML = course.missions.map((m, i) =>
    `<div class="pip ${S.cleared[i] ? "done" : ""} ${i === S.mi ? "cur" : ""}" title="${esc(m.code)} ${esc(m.name)}">${esc(m.code)}</div>`).join("");
}

export function renderCodex(course){
  const S = getState();
  $("#codexList").innerHTML = course.missions.map(m => {
    const un = S.unlocked.includes(m.code);
    return `<div class="cx-item ${un ? "" : "locked"}"><h5>${un ? "◆ " + esc(m.protocol.name) : t("encrypted")}</h5>
      <p>${un ? m.protocol.desc : tf("decrypt", { code: m.code, name: m.name })}</p></div>`;
  }).join("");
}

export function showCert(course){
  const S = getState();
  const syncs = S.syncs.filter(v => typeof v === "number");
  $("#certTitle").textContent = course.certTitle;
  $("#certName").textContent = t("operativeCert") + S.codename;
  $("#cXp").textContent = S.xp;
  $("#cSync").textContent = (syncs.length ? Math.round(syncs.reduce((a, b) => a + b, 0) / syncs.length) : 0) + "%";
  $("#cMiss").textContent = S.cleared.filter(Boolean).length + "/" + course.missions.length;
  $("#certProtos").innerHTML = course.missions.map(m => `<span class="chip">◆ ${esc(m.protocol.name)}</span>`).join("");
  $("#certFoot").textContent = course.certFoot;
  $("#cert").classList.remove("hidden");
  burst(innerWidth / 2, innerHeight / 3, "255,179,71", 50);
  setTimeout(() => burst(innerWidth / 3, innerHeight / 2, "65,224,200", 40), 300);
  setTimeout(() => burst(innerWidth * 2 / 3, innerHeight / 2, "90,169,255", 40), 600);
  SFX.rank();
}
