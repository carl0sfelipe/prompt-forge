/* ============================================================
   FX — ambient glyph rain + spark bursts on a fixed canvas.
   ============================================================ */
const cv = document.querySelector("#fx"), cx = cv.getContext("2d");
let glyphs = [], sparks = [];
const CHARS = "{}<>[]/;:=*#$_&";

function newGlyph(anyY){
  const r = Math.random();
  return {
    x: Math.random() * cv.width,
    y: anyY ? Math.random() * cv.height : cv.height + 20,
    vy: -(.12 + Math.random() * .3),
    c: Math.random() < .6 ? "255,179,71" : (Math.random() < .5 ? "65,224,200" : "90,169,255"),
    ch: CHARS[Math.floor(Math.random() * CHARS.length)],
    s: 9 + Math.random() * 8, a: .04 + Math.random() * .11, ph: Math.random() * 6.28,
  };
}
function fitCanvas(){
  cv.width = innerWidth; cv.height = innerHeight;
  const n = Math.min(64, Math.floor(innerWidth / 22)); glyphs = [];
  for(let i = 0; i < n; i++) glyphs.push(newGlyph(true));
}
export function burst(x, y, col, n){
  for(let i = 0; i < (n || 14); i++){
    const a = Math.random() * 6.28, v = 1 + Math.random() * 3;
    sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, life: 1, c: col });
  }
}
let T = 0;
function loop(){
  T += .016; cx.clearRect(0, 0, cv.width, cv.height);
  for(let i = 0; i < glyphs.length; i++){
    const g = glyphs[i]; g.y += g.vy; g.x += Math.sin(T + g.ph) * .18;
    if(g.y < -20) glyphs[i] = newGlyph(false);
    cx.fillStyle = `rgba(${g.c},${g.a})`; cx.font = g.s + "px IBM Plex Mono"; cx.fillText(g.ch, g.x, g.y);
  }
  for(let i = sparks.length - 1; i >= 0; i--){
    const p = sparks[i]; p.x += p.vx; p.y += p.vy; p.vy += .08; p.life -= .025;
    if(p.life <= 0){ sparks.splice(i, 1); continue; }
    cx.fillStyle = `rgba(${p.c},${p.life * .9})`; cx.fillRect(p.x, p.y, 3, 3);
  }
  requestAnimationFrame(loop);
}
fitCanvas();
addEventListener("resize", fitCanvas);
loop();

export function burstAt(el, col){
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, col, 16);
}
