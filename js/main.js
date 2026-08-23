/* ============================================================
   MAIN — bootstrap: boot sequence, course picker, HUD wiring.
   ============================================================ */
import { COURSES } from "./courses/registry.js";
import { validateAll } from "./engine/validate.js";
import { newState, loadState, setState, getState, save, wipe } from "./engine/state.js";
import { $, toast, updateHUD, renderCodex } from "./engine/ui.js";
import { stampTo } from "./engine/mission.js";
import { SFX, unlockAudio } from "./engine/audio.js";

validateAll(COURSES);

/* ---------------- boot sequence ---------------- */
const BOOT = [
  ["SYS  // FORGE ENGINE v1.0 — training kernel loaded", "sys"],
  ["USER // > write me something about marketing", "bad"],
  ["MODEL// Sure! Marketing is a broad and exciting field with many...", "bad"],
  ["SYS  // output rejected — vagueness detected (97.4%)", "sys"],
  ["SYS  // initiating OPERATIVE TRAINING PROTOCOL…", "sys"],
];

let selected = COURSES[0];
let bi = 0, skipped = false;

function paintBoot(){
  $("#bootTitle").innerHTML = selected.title;
  $("#bootSub").textContent = selected.subtitle;
  $("#bootHint").textContent = selected.hint;
  $("#crsRow").innerHTML = COURSES.length > 1
    ? COURSES.map(c => `<button class="crs-chip ${c.id === selected.id ? "on" : ""}" data-id="${c.id}">${c.chip}</button>`).join("")
    : "";
  document.querySelectorAll(".crs-chip").forEach(el => el.addEventListener("click", () => {
    selected = COURSES.find(c => c.id === el.dataset.id);
    SFX.select(); paintBoot();
  }));
}

function typeBoot(){
  if(skipped) return;
  const log = $("#bootlog");
  if(bi >= BOOT.length){ $("#bootMain").classList.add("on"); setTimeout(() => $("#agent").focus(), 300); return; }
  const [txt] = BOOT[bi]; let ci = 0;
  const iv = setInterval(() => {
    ci += 2; log.textContent += txt.slice(ci - 2, ci);
    if(ci >= txt.length){ clearInterval(iv); log.textContent += "\n"; bi++; setTimeout(typeBoot, 260); }
  }, 14);
}

$("#boot").addEventListener("click", () => {
  if(bi < BOOT.length && !skipped){
    skipped = true;
    $("#bootlog").textContent = BOOT.map(b => b[0]).join("\n") + "\n";
    $("#bootMain").classList.add("on"); setTimeout(() => $("#agent").focus(), 200);
  }
});

function begin(){
  unlockAudio(); SFX.insert();
  const saved = loadState(selected.id);
  const fresh = newState(selected.id);
  const S = saved ?? fresh;
  S.codename = ($("#agent").value.trim() || "NOVA-7").toUpperCase();
  if(S.mi >= selected.missions.length) S.mi = selected.missions.length - 1; // finished save
  setState(S); save();

  const b = $("#boot"); b.style.opacity = "0";
  setTimeout(() => {
    b.classList.add("hidden");
    $("#app").classList.remove("hidden");
    $("#brand").innerHTML = `<span class="blip"></span>${selected.title}<em></em>`;
    renderCodex(selected);
    updateHUD(selected);
    $("#sndBtn").textContent = S.sound ? "SND ON" : "SND OFF";
    if(saved) toast("PROGRESS RESTORED — WELCOME BACK, " + S.codename);
    stampTo(S.mi, selected);
  }, 600);
}
$("#beginBtn").addEventListener("click", begin);
$("#agent").addEventListener("keydown", e => { if(e.key === "Enter") begin(); });

/* ---------------- HUD buttons ---------------- */
$("#codexBtn").addEventListener("click", () => { renderCodex(selected); $("#codex").classList.add("open"); SFX.select(); });
$("#codexClose").addEventListener("click", () => $("#codex").classList.remove("open"));
$("#sndBtn").addEventListener("click", e => {
  const S = getState(); S.sound = !S.sound; save();
  e.target.textContent = S.sound ? "SND ON" : "SND OFF";
  if(S.sound) SFX.select();
});

let resetArmed = false;
$("#resetBtn").addEventListener("click", () => {
  if(!resetArmed){
    resetArmed = true; toast("CLICK RESET AGAIN TO WIPE PROGRESS", true); SFX.err();
    setTimeout(() => resetArmed = false, 3000);
    return;
  }
  wipe();
  $("#cert").classList.add("hidden");
  $("#codex").classList.remove("open");
  setState(newState(selected.id)); save();
  renderCodex(selected); updateHUD(selected);
  stampTo(0, selected);
});

/* ---------------- certificate buttons ---------------- */
$("#rerunBtn").addEventListener("click", () => {
  wipe();
  const S = newState(selected.id); setState(S); save();
  $("#cert").classList.add("hidden");
  renderCodex(selected); updateHUD(selected);
  stampTo(0, selected);
});
$("#certCodexBtn").addEventListener("click", () => { renderCodex(selected); $("#codex").classList.add("open"); });

paintBoot();
typeBoot();
