var http = require("http");

var server = http.createServer(function(req, res){
  res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
  res.end("第一个Node页面 Hello World");
});

// 运行服务器
server.listen(8088, "127.0.0.1")
