import express from "express";
import cors from "cors";
import Database from "better-sqlite3";

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const db = new Database("database.db");
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
const selectAll = db.prepare("SELECT * FROM messages ORDER BY id ASC");

// routes
app.post("/contact", (req, res) => {
  const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
  if (emailRegex.test(req.body.email) && req.body.message) {
    insert.run(req.body.email, req.body.message);
    return res.redirect("/thankyou.html");
  }
  return res.redirect("/invalid.html");
});

app.get("/messages", (_, res) => {
  const messages = selectAll.all();
  res.json(messages);
});

app.get("/messages/:index", (req, res) => {
  const i = req.params.index;
  const messagesLength = db
    .prepare("SELECT COUNT(*) AS count FROM messages")
    .get().count;
  const response = { data: null, error: null };
  if (messagesLength === 0) {
    response.error = "There are no messages";
  } else if (isNaN(Number(i))) {
    response.error = "Index is not a number";
  } else if (!Number.isInteger(Number(i))) {
    response.error = "Index must be an integer";
  } else if (!(i >= 0)) {
    response.error = "Index must be a positive or zero";
  } else {
    response.data = db.prepare("SELECT * FROM messages WHERE id = ?").get(i);
  }
  return res.json(response);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
