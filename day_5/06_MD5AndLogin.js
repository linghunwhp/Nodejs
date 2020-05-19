var express = require("express");
var session = require("express-session");
var db = require("./model/db");
var app = new express();

app.set("view engine", "ejs");

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.get("/", function(req, res){
  res.send("Loing sucessfu, welcome " + req.session.username);
})

app.get("/login", function(req, res){
  res.render("06_login.ejs");
})

app.get("/checklogin", function(req, res){
  var username = req.query.username;
  var password = req.query.password;
  db.find("test", "user", {"username": username, "password": password}, function(err, result){
    if(err){
      res.send(err + "<br/> You got some error when login!")
      return;
    }

    if(result.length == 0){
      res.send("No this user");
      return;
    }
    if(result[0].password == password){
      req.session.login = "1";
      req.session.username = result[0].username;

      res.send("Loing sucessfu, welcome " + result[0].username);
    }else{
      res.send("Your password is incorrect!")
    }
  });
});


app.listen(3000);
