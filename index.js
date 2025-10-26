import express from "express";

const app = express();

// middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const messages = [];

// routes
app.post("/contact", (req, res) => {
  const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/gm;
  if (emailRegex.test(req.body.email) && req.body.message) {
    messages.push(req.body);
    return res.redirect("/thankyou.html");
  }
  return res.redirect("/invalid.html");
});

app.get("/messages", (_, res) => res.json(messages));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
