/* ============================================================
   AUDIO — tiny WebAudio synth. No assets, no dependencies.
   ============================================================ */
import { getState } from "./state.js";

let AC = null;
function ac(){
  if(!AC){ try{ AC = new (window.AudioContext || window.webkitAudioContext)(); }catch(e){} }
  return AC;
}
export function unlockAudio(){ ac(); }

function tone(f, dur, type, vol, delay){
  if(!getState()?.sound) return;
  const c = ac(); if(!c) return;
  const t = c.currentTime + (delay || 0), o = c.createOscillator(), g = c.createGain();
  o.type = type || "square"; o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol || .045, t + .012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + dur + .05);
}

export const SFX = {
  select(){ tone(620, .06, "square", .03); },
  insert(){ tone(520, .05, "square", .03); tone(880, .08, "square", .035, .05); },
  swap(){ tone(440, .05, "triangle", .03); tone(660, .06, "triangle", .03, .05); },
  err(){ tone(150, .22, "sawtooth", .05); },
  run(){ tone(220, .1, "sawtooth", .03); tone(330, .1, "sawtooth", .03, .09); tone(495, .14, "sawtooth", .03, .18); },
  good(){ [523, 659, 784, 1047].forEach((f, i) => tone(f, .14, "triangle", .05, i * .09)); },
  mid(){ tone(440, .12, "triangle", .045); tone(523, .16, "triangle", .045, .12); },
  bad(){ tone(220, .18, "sawtooth", .05); tone(160, .26, "sawtooth", .05, .14); },
  rank(){ [392, 523, 659, 784].forEach((f, i) => tone(f, .22, "triangle", .05, i * .1)); },
};
