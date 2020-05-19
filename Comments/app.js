var express = require("express");
var session = require("express-session");
var app = new express();
var router = require("./router/router")

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

app.set("view engine", "ejs");

app.use(express.static("./public"));
app.use("/header", express.static("./header"));

app.get("/", router.showIndex);
app.get("/register", router.showRegister);
app.post("/doRegister", router.doRegister);
app.get("/login", router.showLogin);
app.post("/doLogin", router.doLogin);
app.get("/setHeader", router.showSetHeader);


app.listen(3000);
