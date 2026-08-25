/* ============================================================
   LOCALIZE — pure course translation merge.

   A course ships its base language at the top level of its data
   and optional overrides in course.locales (e.g. a "pt" folder).
   Merge rules:
   - Missing override keys fall back to the base language.
   - `q` (correctness) is NEVER taken from the translation —
     options merge by index, so a translation can only change
     text, never which option is right.
   ============================================================ */
export function localizeCourse(course, locale){
  const L = course.locales?.[locale];
  if(!L || locale === "en") return course;
  const pick = (a, b) => (b !== undefined && b !== null ? b : a);

  const missions = course.missions.map(m => {
    const lm = L.missions?.[m.code];
    if(!lm) return m;
    return {
      ...m,
      name: pick(m.name, lm.name),
      skill: pick(m.skill, lm.skill),
      protocol: {
        name: pick(m.protocol.name, lm.protocol?.name),
        desc: pick(m.protocol.desc, lm.protocol?.desc),
      },
      brief: {
        obj: pick(m.brief.obj, lm.brief?.obj),
        data: pick(m.brief.data, lm.brief?.data),
        note: pick(m.brief.note, lm.brief?.note),
        criteria: lm.brief?.criteria ?? m.brief.criteria,
      },
      slots: m.slots.map((s, i) => {
        const ls = lm.slots?.[i];
        if(!ls) return s;
        return {
          ...s,
          label: pick(s.label, ls.label),
          options: s.options.map((o, j) => ({
            q: o.q, // correctness comes from the base course only
            t: pick(o.t, ls.options?.[j]?.t),
            why: pick(o.why, ls.options?.[j]?.why),
          })),
        };
      }),
      outcomes: {
        good: pick(m.outcomes.good, lm.outcomes?.good),
        mid: pick(m.outcomes.mid, lm.outcomes?.mid),
        bad: pick(m.outcomes.bad, lm.outcomes?.bad),
      },
    };
  });

  const out = {
    ...course,
    title: pick(course.title, L.title),
    subtitle: pick(course.subtitle, L.subtitle),
    hint: pick(course.hint, L.hint),
    certTitle: pick(course.certTitle, L.certTitle),
    certFoot: pick(course.certFoot, L.certFoot),
    ranks: L.ranks ?? course.ranks,
    missions,
  };
  out._lintLabel = course.id + ":" + locale; // so course lint output is distinguishable
  return out;
}
