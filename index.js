const express = require("express");
const mysql = require("mysql");
const session = require("express-session");
const path = require("path");
const app = express();

const port = 3000;

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "static")));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3309,
  user: "root",
  password: "",
  database: "<DATABASE_NAME>",
});

app.post("/auth", function (req, res) {
  let username = req.body.username;
  let password = req.body.password;

  if (username && password) {
    connection.query(
      `SELECT * FROM scheduledocapp_user WHERE user = ? AND password = ?`,
      [username, password],
      function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = username;
          res.json({name: results[0].name})
        } else {
          res.send("Incorrect Username and/or Password!");
        }
        res.end();
      }
    );
  } else {
    res.send("Please enter Username and Password!");
    res.end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
