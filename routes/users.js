const router = require("express").Router();
const db = require("../config/db");

async function getUser(username) {
  let status = [];
  let con = await db.getConnection();
  const rows = await con.query(
    "SELECT userId, username, `first` FROM users WHERE username = ?",
    [username]
  );
  status.rows = rows;
  status.con = con.end();
  return status;
}

router.use(function(req, res, next) {
  req.loggedin = false;
  if (req.cookies.user) {
    req.loggedin = true;
    req.username = req.cookies.user;
    next();
  } else {
    res.send("not logged in!");
  }
});

router.get("/:username/display", async (req, res) => {
  let user = await getUser(req.params.username);
  if (user.rows.length > 0) {
    res.render("user", {
      title: "user",
      user: user.rows[0]
    });
  } else {
    res.render("userError", {
      msg: "User not found"
    });
  }
});

router.get("/", (req, res) => {
  res.send("user listing");
});

module.exports = router;
