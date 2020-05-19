var express = require("express");
var session = require("express-session");
var app = new express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}));

app.get("/", function(req, res){
  if(req.session.login){
    res.send("Welcome!" + req.session.username);
  }else{
    res.send("You did not login!")
  }
});

app.get("/login", function(req, res){
  req.session.login = true;
  req.session.username = "Lili";
  res.send("You have login successful!");
});

app.listen(3000);

