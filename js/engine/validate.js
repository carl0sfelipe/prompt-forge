/* ============================================================
   VALIDATE — course linter, runs on every boot (console report).

   Purpose: catch authoring mistakes that make a course EXPLOITABLE.
   The main one we guard against: the correct answer being
   systematically the longest option — players learn to just click
   the biggest card. Quality must not correlate with length.

   Checks per slot:
     - exactly one MASTER (q2) and one PASSABLE (q1) option
     - the MASTER must not be the longest option   (info)
     - the MASTER must not be the shortest option  (info)
   Course-level warnings if either happens in > 1/3 of slots.
   ============================================================ */
export function validateCourse(course){
  const issues = [];
  let longest = 0, shortest = 0, slots = 0;

  course.missions.forEach((m, mi) => {
    const where = `${course.id}/${m.code}`;
    if(!m.code || !m.name || !m.skill) issues.push(`[${where}] missing code/name/skill`);
    if(!m.protocol?.name || !m.protocol?.desc) issues.push(`[${where}] missing protocol`);
    if(!m.brief?.obj || !m.brief?.data || !m.brief?.note) issues.push(`[${where}] missing brief fields`);
    if(!m.outcomes?.good || !m.outcomes?.mid || !m.outcomes?.bad) issues.push(`[${where}] missing outcomes`);
    if(!Array.isArray(m.slots) || m.slots.length < 2) issues.push(`[${where}] needs >= 2 slots`);

    m.slots?.forEach(s => {
      slots++;
      const whereSlot = `${where}/${s.id}`;
      const qs = s.options.map(o => o.q);
      if(qs.filter(q => q === 2).length !== 1) issues.push(`[${whereSlot}] must have exactly ONE master (q:2) option — has ${qs.filter(q => q === 2).length}`);
      if(qs.filter(q => q === 1).length !== 1) issues.push(`[${whereSlot}] must have exactly ONE passable (q:1) option — has ${qs.filter(q => q === 1).length}`);
      s.options.forEach(o => {
        if(![0, 1, 2].includes(o.q)) issues.push(`[${whereSlot}] invalid q "${o.q}"`);
        if(!o.t || !o.why) issues.push(`[${whereSlot}] option missing text (t) or explanation (why)`);
      });
      const master = s.options.find(o => o.q === 2);
      if(master){
        const lens = s.options.map(o => o.t.length);
        if(master.t.length >= Math.max(...lens)){ longest++; issues.push(`[info][${whereSlot}] master option is the LONGEST — length becomes a tell (${master.t.length} chars)`); }
        if(master.t.length <= Math.min(...lens)){ shortest++; issues.push(`[info][${whereSlot}] master option is the SHORTEST — brevity becomes a tell (${master.t.length} chars)`); }
      }
    });
  });

  if(slots && longest / slots > 1 / 3) issues.push(`[${course.id}] ⚠ LENGTH EXPLOIT: master is the longest option in ${longest}/${slots} slots — players will just click the biggest card`);
  if(slots && shortest / slots > 1 / 3) issues.push(`[${course.id}] ⚠ LENGTH EXPLOIT (inverse): master is the shortest option in ${shortest}/${slots} slots`);
  return issues;
}

export function validateAll(courses){
  const all = courses.flatMap(validateCourse);
  if(!all.length){ console.log("%c✓ course lint: clean — no exploits detected", "color:#7ee787"); return all; }
  all.forEach(i => console.warn(" COURSE LINT:", i));
  return all;
}
