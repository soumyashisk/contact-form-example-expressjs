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

app.get("/messages/:index", (req, res) => {
  const i = req.params.index;
  let response = { data: null, error: null };
  if (messages.length === 0) {
    response.error = "There are no messages";
  } else if (isNaN(Number(i))) {
    response.error = "Index is not a number";
  } else if (!Number.isInteger(Number(i))) {
    response.error = "Index must be an integer";
  } else if (!(i >= 0)) {
    response.error = "Index must be a positive or zero";
  } else if (!(i < messages.length)) {
    response.error = "Index is greater than the number of messages";
  } else {
    response.data = messages[i];
    messages.splice(i, 1);
  }
  return res.json(response);
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
