const express = require("express");
const bodyParser = require("body-parser");
const db = require("./config/dbConfig");
const path = require("path");
const cors = require("cors");
const port = 5001;

const t0 = require("./routes/t0");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use("/", t0);

app.listen(port, () => {
  db.connect();
  console.log(`Example app listening at http://localhost:${port}`);
});
