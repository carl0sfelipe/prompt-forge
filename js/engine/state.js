/* ============================================================
   STATE — persistent game state (localStorage), no DOM here.
   Persisted per course: progress survives reloads & re-runs.
   ============================================================ */
/* SCHEMA_VERSION — bump when the mission/save shape changes in a way that
   invalidates old progress (e.g. inserting intro missions re-indexed saves). */
const SCHEMA_VERSION = 2;
const keyFor = courseId => `forge:v${SCHEMA_VERSION}:save:${courseId}`;

export function newState(courseId){
  return {
    courseId,
    codename: "AGENT",
    xp: 0,
    mi: 0,          // current mission index
    sound: true,
    syncs: [],      // best sync % per mission index
    cleared: [],    // mission passed the gate (tier mid/good)
    granted: [],    // XP already granted for this mission (first clear only)
    attempts: [],   // compile count per mission index (mentorship signal)
    unlocked: [],   // codex protocol codes revealed
  };
}

export function loadState(courseId){
  try{
    const raw = localStorage.getItem(keyFor(courseId));
    if(!raw) return null;
    return { ...newState(courseId), ...JSON.parse(raw) };
  }catch{ return null; }
}

let S = null;
export function setState(s){ S = s; }
export function getState(){ return S; }
export function save(){ try{ localStorage.setItem(keyFor(S.courseId), JSON.stringify(S)); }catch{} }
export function wipe(){ try{ localStorage.removeItem(keyFor(S.courseId)); }catch{} }
