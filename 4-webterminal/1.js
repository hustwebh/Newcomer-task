class  Foo{
  [Symbol.iterator](){
    return{
      next() {
        return{done:false,value:'foo'};
      }
    }
  }
}
let f= new Foo();
// console.log(f[Symbol.iterator]());
let a=new Array();
// console.log(a[Symbol.iterator]());

function *generatorFn(){}
console.log(generatorFn);
console.log(generatorFn()[Symbol.iterator]);
