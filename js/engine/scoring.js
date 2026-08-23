/* ============================================================
   SCORING — pure functions. No DOM, no side effects.

   Quality scale per option: q2 = master · q1 = passable · q0 = trap.
   A run's tier decides whether the player may advance:
     good  = every slot mastered  (pts === max)
     mid   = at least half the points — may advance
     bad   = below half — mission must be re-run (gate)
   ============================================================ */
export const XP_PER_POINT = 25;

export function scoreRun(slots, sel){
  let pts = 0;
  for(const s of slots) pts += s._opts[sel[s.id]].q;
  const max = slots.length * 2;
  const tier = pts === max ? "good" : (pts >= Math.ceil(max / 2) ? "mid" : "bad");
  return { pts, max, tier, sync: Math.round(pts / max * 100) };
}

export function mayAdvance(run){ return run.tier === "good" || run.tier === "mid"; }

export function rankFor(xp, ranks){
  let r = 0;
  ranks.forEach((rk, i) => { if(xp >= rk[0]) r = i; });
  return r;
}
