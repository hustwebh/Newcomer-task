function Kryptonian() {}
//以上创建Kryptonian这一函数对象

Kryptonian.prototype.fly = function () { console.log("I can fly!")};
//以Kryptonian为原型的一切实例都将从Kryptonian这里获得fly()方法

function Superman() {}
////以上创建Superman这一函数对象
Superman.prototype.whoami = function () { console.log("I am superman!")};
//以Superman为原型的一切实例都将从Superman这里获得whoami()方法

function inherit(Superman, Kryptonian) {
    //Superman.__proto__ = Kryptonian;
    //将Kryptonian作为Superman构造函数的原型实现原型链
    let prototype = Object(Kryptonian.prototype); //创建对象
    prototype.constructor = Superman;  //增强对象，解决重写原型导致constructor丢失
    Superman.prototype = prototype;  //赋值对象
};
inherit(Superman, Kryptonian);

const clark = new Superman();
//clark是构造函数Superman的一个实例;
clark.whoami();
clark.fly();

console.log(clark instanceof Superman);
console.log(clark instanceof Kryptonian);
// console.log(clark.prototype,constructor);
 
