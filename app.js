const express = require("express");
const path = require("path");
const usersRouter = require("./routes/users");
const cookieParser = require("cookie-parser");
const app = express();
const port = 9000;

app.use(
  "/files/",
  express.static(path.join(__dirname, "public"))
);

app.use(cookieParser());
app.use(express.json());

//app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "hbs");

app.use("/users", usersRouter);
app.use("/user", usersRouter);

let userFunc = function(req, res) {
  res.send(req.params.userId + "<br />" + req.params.column);
};

app.post("/jason/", (req, res) => {
  console.log(req.body);

  res.send("Received Data");
});

app.get("/range/:low-:high", function(req, res) {
  let out =
    '<html><head><link rel="stylesheet" href="/files/css/style.css" /></head><body><ol>';
  out += req.cookies.cookie;

  if (req.loggedin) {
    out += `<p>${req.username}</p>`;
  }
  let low = parseInt(req.params.low);
  let high = parseInt(req.params.high);

  if (low > high) {
    let oh = high;
    high = low;
    low = oh;
  }
  for (let i = low; i <= high; i++) {
    out += `<li>${i}</li>`;
  }

  out += "</ol></body></html>";

  res.send(out);
});

app.get("/", (req, res) => {
  res.render("root", { title: "Home" });
});

app.get(/(cat|dog)/, (req, res) => {
  res.send(`<h1>Cats or Dogs!</h1>`);
});

app.get("/cats/", (req, res) => {
  res.send(`<h1>Cats!</h1>`);
});
app.get("/do?gs", (req, res) => {
  res.send(`<h1>Dogs!</h1>`);
});
app.post("/do?gs", (req, res) => {
  res.send(`<h1>Added a dog!</h1>`);
});

app.get("/ze(bra)+", (req, res) => {
  res.send(`<h1>Zebras!</h1>`);
});

app.get("/pen*guin", (req, res) => {
  res.send(`<h1>Penguin!</h1>`);
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
