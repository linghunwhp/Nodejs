let http = require("http");
let fs = require("fs");

http.createServer(function (req, res) {
  res.writeHead(200, {
    "Content-Type": "text/html",
    "Charset": "UTF8"
  });

  // 读取文件夹中的文件，然后进行递归遍历，强制变成同步
  fs.readdir('./a/', function (err, files) {
    let folders = [];
    (function iterator(i) {
      if (i == files.length) {
        console.log(folders);
        return;
      }

      // 判断文件夹类型
      fs.stat("./a/" + files[i], function (err, stats) {
        if (stats.isDirectory()) {
          folders.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0);
  })

  res.end();
}).listen(3000, "127.0.0.1");