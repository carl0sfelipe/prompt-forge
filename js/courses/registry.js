/* COURSE REGISTRY — the single place a new course gets plugged in.
   1. Create js/courses/<your-course>/course.js + mission-*.js
   2. Import it here and add it to COURSES.
   The boot screen turns into a course picker automatically when
   there is more than one. */
import promptEngineering from "./prompt-engineering/course.js";

export const COURSES = [
  promptEngineering,
];
