let http = require("http");
let url = require("url");

http.createServer(function (req, res) {
  let urlQurey = url.parse(req.url, true).query;
  let name = urlQurey.name;
  let age = urlQurey.age;
  let sex = urlQurey.sex;
  res.writeHead(200, {"Content-Type":"text/html", "Charset": "UTF8"});
  res.write(name + " " + age + " " + sex);
  res.end();
}).listen(3000, "127.0.0.1");