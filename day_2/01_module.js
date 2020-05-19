// 暴露函数或者变量
// let msg = "Hello World!";
// function sayHello(){
//   console.log("Hello World");
// }
// exports.msg = msg;
// exports.sayHello = sayHello;

// 暴露类
function People(name, sex, age) {
  this.name = name;
  this.sex = sex;
  this.age = age;
}

People.prototype = {
  sayHello: function () {
    console.log(this.name, this.sex, this.age);
  }
}

module.exports = People;