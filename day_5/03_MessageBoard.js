var express = require("express");
var app = new express();
var formidable = require("formidable");
var db = require("./model/db");

app.set("view engine", "ejs");

app.use(express.static("./public"))

app.get("/", function(req, res, next){
  // var form = new formidable.IncomingForm();
  // form.parse(req, function(err, fields){
  //   console.log("Submit success" + fields.name + " " + fields.message);
  // });

  db.getAllCount("test", "MessageBoard", function(err, count){
    res.render("index", {
      "page": Math.ceil(count / 4)
    });
  });
});

app.post("/msgSubmit", function(req, res, next){
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields){
    db.insertOne("test", "MessageBoard", {
      "name": fields.name,
      "message": fields.message,
      "time": fields.time
    }, function(err, result){
      if(err){
        res.json("-1"); // Return for Ajax
        return;
      }
      res.json("1");
    });
  });
});

app.get("/read", function(req, res, next){
  var pageAmount = 4;
  var page = parseInt(req.query.page);
  db.find("test", "MessageBoard", {}, {pageAmount:pageAmount, page:page, sort: {"time": -1}}, function(err, result){
    res.json(result);
  });
});

app.get("/count", function(req, res){
  db.getAllCount("test", "MessageBoard", function(err, count){
    res.send(count.toString());
  });
});

app.listen(3000);

