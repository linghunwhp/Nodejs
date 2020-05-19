var formidable = require("formidable");
var db = require("../models/db");
var md5 = require("../models/md5");

exports.showIndex = function(req, res, next){
  // if login successfully, find in db for user's header
  var header = "";
  if(req.session.login == "1")
  {
    db.find("comment", "user", {"username": req.session.username}, function(err, result){
      if(err){
        res.send("-3"); // Server error.
        return;
      }
      header = result[0].header || "default.jpg";
    });
  }

  res.render("index",{
    "login": req.session.login == "1" ? true : false,
    "username": req.session.login == "1" ? req.session.username : "",
    "active": "index",
    "header": header
  });
};

exports.showRegister = function(req, res, next){
  res.render("register",{
    "login": req.session.login == "1" ? true : false,
    "username": req.session.login == "1" ? req.session.username : "",
    "active": "register",
    "header": "default.jpg"
  });
};

exports.doRegister = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if(err){
      res.send("-3"); // Server error.
      return;
    }

    db.find("comment", "user", {"username": fields.username}, function(err, result){
      if(err){
        res.send("-3"); // Server error.
        return;
      }
      if(result.length != 0){
        res.send("-1"); // This username has been used.
        return;
      }

      db.insertOne("comment", "user", {"username": fields.username, "password": md5(fields.password)}, function(err, result){
        if(err){
          res.send("-3"); // Server error.
          return;
        }
        req.session.login = "1";
        req.session.username = fields.username;
        res.send("1");
      });

    });
  });
};

exports.showLogin = function(req, res, next){
  res.render("login",{
    "login": req.session.login == "1" ? true : false,
    "username": req.session.login == "1" ? req.session.username : "",
    "active": "login"
  });
};

exports.doLogin = function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    if(err){
      res.send("-3"); // Server error.
      return;
    }

    db.find("comment", "user", {"username": fields.username}, function(err, result){
      if(err){
        res.send("-3"); // Server error.
        return;
      }
      if(result[0].password == md5(fields.password)){
        req.session.login = "1";
        req.session.username = fields.username;
        res.send("1");
      } else {
        res.send("0");        
      }
    });
  });
};

exports.showSetHeader = function(req, res, next){
  if(req.session.login != "1")
  {
    res.end("You did not login!");
    return;
  }

  res.render("showSetHeader",{
    "login": true,
    "username": req.session.username,
    "active": "setHeader"
  });
};