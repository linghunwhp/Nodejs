// 调用暴露函数或者变量
// const modu = require('./01_module');
// console.log(modu.msg);
// modu.sayHello();


// 调用暴露类
const People = require('./01_module');

let xm = new People("xiaoming", "man", "15");
xm.sayHello(); 