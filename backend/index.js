const express = require("express");
const app = express();

require("dotenv").config({
  path: process.env.NODE_ENV === "prod" ? ".env.prod" : ".env",
});

const port = process.env.PORT || 3000;

app.listen(port)



