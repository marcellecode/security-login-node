const express = require("express");
const app = express();
const { encryptData } = require("./encrypt");
const { verify } = require("./verify");

require("dotenv").config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env",
});

const port = process.env.PORT || 3000;
const key = process.env.KEY;

app.use(express.json());

app.post("/auth", function (req, res) {
  const encryptPass = encryptData(req.body.pass, key);

  if (verify(encryptPass) === 1) {
    res.status(200).send("Sucesso 1");
  }
});

app.listen(port);
console.log(`API run http://localhost:${port}`);

