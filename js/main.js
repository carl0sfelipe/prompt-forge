/* ============================================================
   MAIN — bootstrap: boot sequence, language + course pickers,
   HUD wiring. The course passed to the engine is the LOCALIZED
   course (see engine/localize.js); progress is stored under the
   base course id, so it is shared across languages.
   ============================================================ */
import { COURSES } from "./courses/registry.js";
import { validateAll } from "./engine/validate.js";
import { localizeCourse } from "./engine/localize.js";
import { newState, loadState, setState, getState, save, wipe } from "./engine/state.js";
import { $, toast, updateHUD, renderCodex } from "./engine/ui.js";
import { stampTo } from "./engine/mission.js";
import { SFX, unlockAudio } from "./engine/audio.js";
import { LANGS, initLocale, getLocale, setLocale, t, applyStatic, sndLabel } from "./engine/i18n.js";

/* lint base courses + every localized variant (catches PT length bias too) */
validateAll(COURSES.flatMap(c => [c, ...Object.keys(c.locales ?? {}).map(l => localizeCourse(c, l))]));

/* ---------------- language + course selection ---------------- */
let selected = COURSES[0];
let locale = initLocale();
let activeCourse = localizeCourse(selected, locale);

function refreshActive(){
  activeCourse = localizeCourse(selected, locale);
}

function paintLang(){
  $("#langRow").innerHTML = LANGS.map(l =>
    `<button class="lang-chip ${l.code === locale ? "on" : ""}" data-lang="${l.code}">${l.label}</button>`).join("");
  document.querySelectorAll(".lang-chip").forEach(el => el.addEventListener("click", () => {
    const l = el.dataset.lang;
    if(l === locale) return;
    locale = l; setLocale(l); refreshActive();
    applyStatic(); paintLang(); paintBoot();
  }));
}

function paintBoot(){
  $("#bootTitle").innerHTML = activeCourse.title;
  $("#bootSub").textContent = activeCourse.subtitle;
  $("#bootHint").textContent = activeCourse.hint;
  $("#crsRow").innerHTML = COURSES.length > 1
    ? COURSES.map(c => `<button class="crs-chip ${c.id === selected.id ? "on" : ""}" data-id="${c.id}">${c.chip}</button>`).join("")
    : "";
  document.querySelectorAll(".crs-chip").forEach(el => el.addEventListener("click", () => {
    selected = COURSES.find(c => c.id === el.dataset.id);
    refreshActive();
    SFX.select(); paintBoot();
  }));
}

/* ---------------- boot sequence ---------------- */
const BOOT = [["boot0"], ["boot1"], ["boot2"], ["boot3"], ["boot4"]];
let bi = 0, skipped = false;

function typeBoot(){
  if(skipped) return;
  const log = $("#bootlog");
  if(bi >= BOOT.length){ $("#bootMain").classList.add("on"); setTimeout(() => $("#agent").focus(), 300); return; }
  const txt = t(BOOT[bi][0]); let ci = 0;
  const iv = setInterval(() => {
    ci += 2; log.textContent += txt.slice(ci - 2, ci);
    if(ci >= txt.length){ clearInterval(iv); log.textContent += "\n"; bi++; setTimeout(typeBoot, 260); }
  }, 14);
}

$("#boot").addEventListener("click", () => {
  if(bi < BOOT.length && !skipped){
    skipped = true;
    $("#bootlog").textContent = BOOT.map(b => t(b[0])).join("\n") + "\n";
    $("#bootMain").classList.add("on"); setTimeout(() => $("#agent").focus(), 200);
  }
});

function begin(){
  unlockAudio(); SFX.insert();
  const course = activeCourse;
  const saved = loadState(course.id);
  const S = saved ?? newState(course.id);
  S.codename = ($("#agent").value.trim() || "NOVA-7").toUpperCase();
  if(S.mi >= course.missions.length) S.mi = course.missions.length - 1; // finished save
  setState(S); save();

  const b = $("#boot"); b.style.opacity = "0";
  setTimeout(() => {
    b.classList.add("hidden");
    $("#app").classList.remove("hidden");
    $("#brand").innerHTML = `<span class="blip"></span>${course.title}`;
    renderCodex(course);
    updateHUD(course);
    $("#sndBtn").textContent = sndLabel(S.sound);
    if(saved) toast(t("restored") + S.codename);
    stampTo(S.mi, course);
  }, 600);
}
$("#beginBtn").addEventListener("click", begin);
$("#agent").addEventListener("keydown", e => { if(e.key === "Enter") begin(); });

/* ---------------- HUD buttons ---------------- */
$("#codexBtn").addEventListener("click", () => { renderCodex(activeCourse); $("#codex").classList.add("open"); SFX.select(); });
$("#codexClose").addEventListener("click", () => $("#codex").classList.remove("open"));
$("#sndBtn").addEventListener("click", e => {
  const S = getState(); S.sound = !S.sound; save();
  e.target.textContent = sndLabel(S.sound);
  if(S.sound) SFX.select();
});

let resetArmed = false;
$("#resetBtn").addEventListener("click", () => {
  if(!resetArmed){
    resetArmed = true; toast(t("resetConfirm"), true); SFX.err();
    setTimeout(() => resetArmed = false, 3000);
    return;
  }
  wipe();
  $("#cert").classList.add("hidden");
  $("#codex").classList.remove("open");
  setState(newState(activeCourse.id)); save();
  renderCodex(activeCourse); updateHUD(activeCourse);
  stampTo(0, activeCourse);
});

/* ---------------- certificate buttons ---------------- */
$("#rerunBtn").addEventListener("click", () => {
  wipe();
  const S = newState(activeCourse.id); setState(S); save();
  $("#cert").classList.add("hidden");
  renderCodex(activeCourse); updateHUD(activeCourse);
  stampTo(0, activeCourse);
});
$("#certCodexBtn").addEventListener("click", () => { renderCodex(activeCourse); $("#codex").classList.add("open"); });

applyStatic();
paintLang();
paintBoot();
typeBoot();
