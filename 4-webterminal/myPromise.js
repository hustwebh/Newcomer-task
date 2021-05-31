//利用常量表示Promise的状态
const PENDING = `peading`;
const FULFILLED = `fulfilled`;
const REJECTED = `rejected`;


class MyPromise {
  constructor(excutor) {
    //excutor是promise的立刻执行代码部分
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
  }
  //status设定初始状态
  status = PENDING;
  //成功之后
  value = null;
  //失败之后
  reason = null;
  // 存储成功回调函数
  onFulfilledCallback = [];
  //储存为空数组是为了应对同时调用多个then方法只会执行最后一个的问题
  // 存储失败回调函数
  onRejectedCallback = [];
  reslove = (value) => {
    if (this.status === PENDING) {
      // 状态修改为成功
      this.status = FULFILLED;
      // 保存成功之后的值
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        // Array.shift() 取出数组第一个元素，然后（）调用，shift不是纯函数，取出后，数组将失去该元素
        this.onFulfilledCallbacks.shift()(value)
      }
    }
  };
  reject = (reason) => {
    if (this.status == PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason)
      }
    }
  };

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((reslove, reject) => {
      if (this.status === FULFILLED) {
        // 调用成功回调，并且把值返回
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入resolvePromise处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      } else if (this.status === REJECTED) {
        // 调用失败回调，并且把原因返回
        //创建等待promise2初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        })
      } else if (this.status === PENDING) {
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        this.onFulfilledCallback.push(
          () => {
            queueMicrotask(() => {
              try {
                // 获取成功回调函数的执行结果
                const x = onFulfilled(this.value);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              }
            })
          }
        );
        this.onRejectedCallback.push(
          () => {
            queueMicrotask(() => {
              try {
                // 调用失败回调，并且把原因返回
                const x = onRejected(this.reason);
                // 传入 resolvePromise 集中处理
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error)
              }
            })
          });
      }
    })
    return promise2;
  }
  //设置reslove静态方法，可以直接调用
  static reslove(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    // 转成常规方式
    return new MyPromise(resolve => {
      resolve(parameter);
    });
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason);
    });
  }
}

function resolvePromise(promise2, obj, reslove, reject) {
  //防止出现return自身的情况
  if (promise2 == x) {
    return reject(new Error(`Can not return itself!`));
  }
  if (obj instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
module.exports = MyPromise;