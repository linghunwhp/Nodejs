var express = require("express");
var app = new express();
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");

app.get("/", function(req, res){
  // url is the address of database.
  MongoClient.connect('mongodb://localhost:27017/test', function(err, client){
    if(err)
    {
      res.send(err + 'Connect database failed!');
      return;
    }

    console.log("Connected correctly to server!");

    // if there is no dataase or collection, it will be auto set up.
    var db = client.db('test');
    db.collection('student').insertOne({
      name: "Lucy",
      age: parseInt(Math.random() * 100 + 10)
    }, function(err, result){
      if(err){
        res.send(err +  "Insert data to DB failed!");
        return;
      }
      res.send(result +  "Insert data to DB successful!");
    });
    
    client.close();
  });
})


app.listen(3000);