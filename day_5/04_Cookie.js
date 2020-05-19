var express = require("express");
var cookieParser = require("cookie-parser");
var app = new express();

app.use(cookieParser());

app.get("/", function(req,res){
  // 90000 is ms
  res.cookie('Name', 'whp', {maxAge: 90000, httpOnly: true});
  res.send(req.cookies);
});

app.listen(3000);
