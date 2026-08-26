/* V4 — THE PERSISTENCE · DATA + lab shop-db (schema/migration/backup) */
export default {
  code: "V4", name: "THE PERSISTENCE", skill: "DATA MODELING",
  protocol: { name: "DATA OUTLIVES CODE", desc: "The app will be rewritten three times; the database will still be there in ten years. Declarative integrity, versioned migrations with a rollback plan, and backups proven by restore drills." },
  brief: {
    obj: "The shop grew out of the spreadsheet era — but its 'database' is one JSON-blob table. Reporting does full scans, nobody can add a FK, and the founder just asked for 'a coupon feature by Friday'.",
    data: "DB       : sqlite shop.db (single table orders(payload JSON))\nMIGRATION : migrate.sql exists — half-written by an intern\nREPORT   : weekly revenue query = 40s full scan\nASK      : proper schema + coupons, without losing a single order",
    note: "A schema is a contract the database enforces for you, forever: <b>FK, UNIQUE, NOT NULL</b> beat a thousand app-side checks (which the AI regenerates weekly). And a migration is only real when it has a rehearsed way back.",
    criteria: ["integrity declarative", "migration reversible", "backup proven"],
  },
  lab: {
    folder: "shop-db",
    task: "Turn the JSON-blob into a real schema and apply it safely. The intern left migrate.sql half-done — review it with opencode BEFORE running anything.",
    acceptance: ["orders, customers, items as proper tables with PK/FK/NOT NULL; coupon field with type + constraint", "zero data loss: row counts and totals identical before/after (seed has 3 customers, 5 orders)", "rollback documented and TESTED (a revert script that restores the original table)", "no blind execution: the dangerous line in the half-written migration identified in your notes"],
    catch: "migrate.sql opens with DROP TABLE orders — the intern's 'start over cleanly'. An AI assistant told to 'apply this migration' will happily run it and vaporize every order. The typo'd FK reference (costumers) makes the schema fail halfway — after the drop. Reading before running was the whole test.",
    files: {
      "README.md": "# shop-db\n\nThe shop's 'database' is one JSON-blob table. The founder wants coupons by Friday.\n\nDEMAND:\n1. Real schema: customers, orders, order_items (+ coupon on orders).\n2. Migrate seed data with ZERO loss.\n3. The intern left migrate.sql half-written — REVIEW IT FIRST.\n4. A tested rollback script (revert.sql) beside it.\n\nVerify: sqlite3 shop.db < checks.sql  → all OK\n",
      "schema.sql": "CREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  payload TEXT NOT NULL   -- everything lives here as JSON\n);\nINSERT INTO orders (payload) VALUES\n ('{\"customer\":\"ada@x.com\",\"total\":150.0,\"items\":[{\"sku\":\"COFFEE\",\"qty\":2,\"unit\":12.5}]}'),\n ('{\"customer\":\"ada@x.com\",\"total\":5.0,\"items\":[{\"sku\":\"TIP\",\"qty\":1,\"unit\":5.0}]}'),\n ('{\"customer\":\"grace@x.com\",\"total\":99.9,\"items\":[{\"sku\":\"BOOK\",\"qty\":1,\"unit\":99.9}]}'),\n ('{\"customer\":\"alan@x.com\",\"total\":25.0,\"items\":[{\"sku\":\"PEN\",\"qty\":5,\"unit\":5.0}]}'),\n ('{\"customer\":\"grace@x.com\",\"total\":12.5,\"items\":[{\"sku\":\"COFFEE\",\"qty\":1,\"unit\":12.5}]}');\n",
      "migrate.sql": "-- half-written by the intern. REVIEW BEFORE RUNNING.\nDROP TABLE orders;                     -- 'start clean' (!)\n\nCREATE TABLE customers (\n  id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE\n);\nCREATE TABLE orders (\n  id INTEGER PRIMARY KEY,\n  customer_id INTEGER NOT NULL REFERENCES costumers(id),  -- typo (!)\n  coupon TEXT CHECK (coupon IN ('NONE','WELCOME10','FRIDAY')) DEFAULT 'NONE',\n  total_cents INTEGER NOT NULL\n);\nCREATE TABLE order_items (\n  id INTEGER PRIMARY KEY,\n  order_id INTEGER NOT NULL REFERENCES orders(id),\n  sku TEXT NOT NULL, qty INTEGER NOT NULL CHECK (qty > 0),\n  unit_cents INTEGER NOT NULL\n);\n-- (data migration never written)\n",
      "checks.sql": "SELECT 'customers=3' WHERE (SELECT COUNT(*) FROM customers)=3;\nSELECT 'orders=5' WHERE (SELECT COUNT(*) FROM orders)=5;\nSELECT 'items=10' WHERE (SELECT COUNT(*) FROM order_items)=10;\nSELECT 'total_ok' WHERE (SELECT SUM(total_cents) FROM orders)=29240;\nSELECT 'fk_integrity', 'OK' WHERE NOT EXISTS (\n  SELECT 1 FROM orders o LEFT JOIN customers c ON o.customer_id=c.id WHERE c.id IS NULL);\n",
    },
  },
  slots: [
    { id: "SCH", label: "THE SCHEMA", options: [
      { t: "customers / orders / order_items with PK, FK and NOT NULL; coupon as enum CHECK — the database enforces integrity forever.", q: 2, why: "Declarative integrity is enforced on every write by every code path — including the ones the AI regenerates next week." },
      { t: "Keep the JSON blob but add generated columns and indexes on the hot paths.", q: 1, why: "A real technique (JSONB-style) — but checks stay app-side and FKs stay impossible; the coupon-by-Friday ask keeps mutating shape." },
      { t: "One wide orders table with every field flattened in — no joins, no ORM gymnastics, and the reporting queries become trivial single-table SELECTs that anyone on the team can write and understand.", q: 0, why: "Flattening multiplies the same lie: customer email copied per order, no uniqueness, updates drift. Reporting scans forever." },
      { t: "Document-first: keep JSON, add a validation layer in the app for coupons and totals.", q: 0, why: "Moving the contract into the most-regenerated layer (app code) is betting the business on AI output staying consistent forever." },
    ]},
    { id: "MIG", label: "THE MIGRATION", options: [
      { t: "Review migrate.sql line by line, remove the DROP, fix the FK typo, write the missing data copy, test on a copy of the DB, rehearse revert.sql.", q: 2, why: "The migration is code: reviewed, tested on a copy, with its way back rehearsed. The DROP and the typo never reach production." },
      { t: "Run the intern's migrate.sql on staging first — if it works there it should be safe for production, and staging exists exactly so we don't have to review every line of a migration by hand on a Friday.", q: 0, why: "It can't work (typo'd FK) — and if it half-did, staging success says nothing about prod data. The DROP is fatal either way." },
      { t: "Fix the schema in a DB admin GUI directly against production — faster, visual, and the founder is standing right there waiting; a five-minute visual change beats a whole reviewed migration file for three tables.", q: 0, why: "Surgery with a canivete: no review, no rollback, no record. Friday deadline becomes Friday incident." },
      { t: "Ask the AI to 'make this migration correct and safe' and run what it returns.", q: 1, why: "The AI will likely fix the typo and maybe the DROP — but 'likely' is not a review, and nobody signed the diff. Verify line by line, then yes." },
    ]},
    { id: "BAK", label: "THE BACKUP", options: [
      { t: "Nightly dump + monthly restore drill into a scratch DB, retention on another disk.", q: 2, why: "Backup = copy + REHEARSED restore + off-box retention. The drill is what turns hope into a plan." },
      { t: "The nightly dump has been running faithfully for two years — we're covered, adding restore drills on top of a working backup schedule is just ceremonial process for a shop of our size.", q: 0, why: "Two years of unverified dumps is two years of maybe-nothing. Untested restore is not backup (and the disk it shares can die with it)." },
      { t: "Snapshot the VM before the migration — that's our safety net.", q: 1, why: "Good for the migration window; not a retention strategy, and restores-of-apps are slower and coarser than data restores." },
      { t: "The schema has FKs now — data can't corrupt, backups are belt-and-suspenders.", q: 0, why: "Integrity constraints don't cover deletes, drops, fat-fingers or ransomware. The DROP in migrate.sql was exactly this lesson." },
    ]},
  ],
  outcomes: {
    good: "Friday 16:00 — migrated on a copy, rehearsed revert, deployed\n• checks.sql: all OK (3 customers, 5 orders, 10 items, totals match)\n• DROP removed, FK typo fixed, data copy written and diffed\n• revenue query: 40s → 90ms\n→ coupons shipped ON TIME; the intern's line got a code review lesson attached.",
    mid: "Friday 19:30 — schema right, migration survived\n• ran corrected migrate.sql after one failed attempt on staging\n• no revert script — 'we'll write it if needed'\n→ zero loss this time, by luck of the copy, not by plan.",
    bad: "Friday 21:00 — migrate.sql ran as-is\n• DROP hit before the typo stopped it: orders gone, migration half-created\n• last verified dump: 11 months old (and on the same disk)\n→ the coupon feature now has a much bigger project to live inside.",
  },
};
