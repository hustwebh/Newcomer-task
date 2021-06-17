// const todo_count = document.getElementsByClassName('todo-count')[0];
// const clearAll = document.getElementsByClassName('clear-completed')[0];
// const new_todo = document.getElementsByClassName('new-todo')[0];//输入框对象
// const ul = document.getElementsByClassName('todo-list')[0];//ul对象
// const filters = document.getElementsByClassName('filters')[0];
// const arr = new Array();


// const handler = {
//   set: function (target, prop, value) {
//     target[prop] = value;
//     todo_count.innerHTML = `${target[prop]} items left`
//   }
// }
// let listCount = new Proxy({ value: 0 }, handler);
// //设置对左下剩余任务数量的监听

// function addItem(event) {  //添加一个未完成的新任务
//   if (event.keyCode === 13) {
//     if (new_todo.value !== '') {
//       ul.innerHTML += `
//   <li class="">
//     <div class="view">
//       <input class="toggle" type="checkbox">
//       <label>${new_todo.value}</label>
//       <button class="destroy"></button>
//     </div>
//   </li>`
//       listCount.value++;
//       arr.push({ name: new_todo.value, iscomplete: false })
//       new_todo.value = '';
//     }
//   }
// }
// document.addEventListener("keydown", addItem);
// //设置添加新任务



// function changeItem(event) {
//   let [target, i] = [event.target, 0];
//   for (; i < ul.children.length; i++) {
//     if (target.parentNode.parentNode === ul.children[i]) break;
//   }
//   if (target.className === 'toggle') {
//     if (!arr[i].iscomplete) {
//       arr[i].iscomplete = true;
//       ul.children[i].className = 'completed';
//       listCount.value--;
//       clearAll.style.display = 'block';
//     } else {
//       arr[i].iscomplete = false;
//       ul.children[i].className = '';
//       listCount.value++;
//       //如果数组里全是false，则按钮消失
//       if (arr.every(_ => {
//         return !(_.iscomplete)
//       })) { clearAll.style.display = 'none'; }
//     }
//   } else if (target.className === 'destroy') {
//     ul.removeChild(ul.children[i]);
//     arr.splice(i, 1);
//     listCount.value--;
//   }
// }
// ul.addEventListener("click", changeItem);
// //将某任务设置为已完成或者删除任务

// function completedClear() {
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i].iscomplete === true) {
//       ul.removeChild(ul.children[i]);
//       arr.splice(i, 1);
//     }
//   }
//   clearAll.style.display = 'none';
// }
// clearAll.addEventListener('click', completedClear);

// function filtersChange(event) {
//   let [target, i, str,num] = [event.target, 0, ``];
//   ul.innerHTML = '';
//   for (; i < filters.children.length; i++) {
//     if (target.parentNode === filters.children[i]) {
//       filters.children[i].children[0].className = 'selected';
//       num = i;
//     } else {
//       filters.children[i].children[0].className = '';
//     }
//   }
//   switch (num) {
//     case 0:
//       for (let j = 0; j < arr.length; j++) {
//         str += `
//       <li class="">
//         <div class="view">
//           <input class="toggle" type="checkbox">
//           <label>${arr[j].name}</label>
//           <button class="destroy"></button>
//         </div>
//       </li>`
//       }
//       break;
//     case 1:
//       for (let j = 0; j < arr.length; j++) {
//         if (arr[j].iscomplete === false) {
//           str += `
//         <li class="">
//           <div class="view">
//             <input class="toggle" type="checkbox">
//             <label>${arr[j].name}</label>
//             <button class="destroy"></button>
//           </div>
//         </li>`
//         }
//       }
//       break;
//     case 2:
//       for (let j = 0; j < arr.length; j++) {
//         if (arr[j].iscomplete === true) {
//           str += `
//           <li class="">
//             <div class="view">
//               <input class="toggle" type="checkbox">
//               <label>${arr[j].name}</label>
//               <button class="destroy"></button>
//             </div>
//           </li>`
//         }
//       }
//       break;
//   }
//   ul.innerHTML += str;
// }
// filters.addEventListener('click', filtersChange);



const config = require("webpack.config.js")
console.log(config);