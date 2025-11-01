import Database from "better-sqlite3";
const db = new Database("foobar.db");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    message TEXT NOT NULL
);
`);

const insert = db.prepare(
  "INSERT INTO messages (email, message) VALUES (?, ?)"
);

// insert.run("test@example.com", "Hello, world!");

const selectAll = db.prepare("SELECT * FROM messages");
console.log(selectAll.all());

export default db;
