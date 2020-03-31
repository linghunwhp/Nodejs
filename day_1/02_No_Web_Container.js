var http = require("http");
var fs = require("fs");

var server = http.createServer(function (req, res) {
  if (req.url == "/square") {
    // 这里的相对路径，相对的是盘符路径
    fs.readFile("./s.html", function (err, data) {
      res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
      res.end(data);
    });
  } else if (req.url == "/circle") {
    fs.readFile("./c.html", function (err, data) {
      res.writeHead(200, {"Content-type": "text/html;charset=UTF-8"});
      res.end(data);
    });
  } else if (req.url == "/0.PNG") {
    fs.readFile("./0.PNG", function (err, data) {
      res.writeHead(200, {"Content-type": "image/png;charset=UTF-8"});
      res.end(data);
    });
  } else {
    res.writeHead(404, {"Content-type": "text/html;charset=UTF-8"});
    res.end("Can't find this page");
  }
});

// 运行服务器
server.listen(8088, "127.0.0.1")