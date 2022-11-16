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
const jwt = require("jsonwebtoken");

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
    if (verify(req.body.user, encryptPass) === 1) {
      const token = jwt.sign(
        { user: req.body.user },
        process.env.SECRET,
        { expiresIn: 300 } //segundos
      );
      res.status(200).send({ auth: true, token: token });
    } else {
      res.status(401).send("Não autorizado");
    }
  }
});


function verifyJWT(req, res, next){
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

app.get("/redirect", verifyJWT,(req, res, next) => {
  console.log("Retornou todos clientes!");
  res.json([{id:1,nome:'luiz'}]);
})


app.listen(port);

console.log(`API run http://localhost:${port}`);
