require("dotenv").config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env",
});

const express = require("express");
const app = express();
const { encryptData } = require("./encrypt");
const { verify } = require("./verify");
const { sqlInjectionProtection } = require("./sqlInjectionProtection");
const port = process.env.PORT || 3000;
const key = process.env.KEY;

app.use(express.json());

app.post("/auth", function (req, res) {
  const verifySqlInjection = sqlInjectionProtection(
    req.body.user,
    req.body.pass
  );
  const encryptPass = encryptData(req.body.pass, key);

  if (verifySqlInjection.length > 0) {
    res.status(401).send("Não autorizado");
  } else {
    if (verify(req.body.user,encryptPass) === 1) {
      res.status(200).send("Sucesso 1");
    } else {
      res.status(401).send("Não autorizado");
    }
  }
});

app.listen(port);

console.log(`API run http://localhost:${port}`);
