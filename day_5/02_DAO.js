// Data access object
var express = require("express");
var app = new express();
var db = require("./model/db");

app.get("/", function(req, res){
  db.insertOne("test", "teacher", {"name":"Lili"}, function(err, result){
    if(err){
      res.send(err + "</br> Insert to DB failed!");
      return;
    }
    res.send(result + "</br> Insert to DB successfully!");
  });
})

app.get("/find", function(req, res){
  var page = parseInt(req.query.page);  // Read params to find this page's data; Start from 1

  db.find("test", "teacher", {name: "Lili"}, {pageAmount: 1, page: page, sort: {"time": -1}}, function(err, result){
    if(err){
      res.send(err + "Read from DB failed!");
      return;
    }
    res.json(result);
  });
})

app.get("/delete", function(req, res){
  var id = req.query.id;

  db.deleteMany("test", "teacher", {"name" : id}, function(err, result){
    if(err){
      res.send(err + "</br> Delete" + id + "from DB failed!");      
    }
    res.send(result + "</br> Delete from DB successfully!");
  });
});


app.get("/update", function(req, res){
  db.updateMany("test", "teacher", {"name": "Lili"}, {$set:{"name":"Lucy"}}, function(err, result) {
    if(err){
      res.send(err + "</br> Update in DB failed!");      
    }
    res.send(result + "</br> Update in DB successfully!");
  });
})

app.listen(3000);