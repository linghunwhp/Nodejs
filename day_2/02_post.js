const http = require("http");
const querystring = require("querystring");

http.createServer(function(req, res){
  if(req.url == "/post" && req.method.toLowerCase() == "post"){
    // NodeJS 防止传输内容过大，分块传输，下面是标准写法
    let allData = "";
    req.addListener("data", function(chunk){
      allData += chunk;
      console.log(chunk);
    });

    req.addListener("end", function(){
      console.log(allData);
      let obj = querystring.parse(allData.toString());
      console.log(obj);
      res.end("Success");
    });
  }
}).listen(3000, "localhost")