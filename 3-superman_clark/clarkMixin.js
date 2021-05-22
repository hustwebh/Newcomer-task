class Human {
    speak() {
        console.log("I can speak");
    }
}

class Kryptonian {
    fly() {
        console.log("I can fly!");
    }
}
let d = {fn:console.log}
function mixin(receivingClass, ...givingClass) {
    if (arguments.length = 2) {  // 将所有givingClass的属性mixin给recevingClass
        for (let protoName in givingClass.prototype) {
            if (!receivingClass.prototype.hasOwnProperty(protoName)) {
                receivingClass.prototype[protoName] = givingClass.prototype[protoName];
            } else {
                console.log(`Have the same proto ${protoName}`);        //在有方法相同时输出警告
            }
        }
        return receivingClass;
    } else {  //利用递归调用实现传入多个类/对象时能达到目的
        for (let i = arguments.length - 1; i > 0; i--) {
            mixin(arguments[i - 1], arguments[i]);
        }
    }
}

class Superman extends mixin(Kryptonian, Human) {

}

function applyMixin() {
    let inherit = mixin(arguments[1].join(","));//调用mixin函数实现类构造器数组的处理
    //然后实现继承
    let prototype = Object(inherit.prototype); //创建对象
    prototype.constructor = arguments[0];  //增强对象，解决重写原型导致constructor丢失
    arguments[0].prototype = prototype;
}


let clark = new Superman();