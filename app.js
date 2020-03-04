const express = require("express");
const app = express();
const port = 9000;

app.get("/", (req, res) => {
  res.send("time for lunch!");
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
