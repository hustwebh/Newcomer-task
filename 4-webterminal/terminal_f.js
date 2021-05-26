import * as terminal_main from './terminal_main.js'
const data = {
  value: '',
}
let echo = /^echo\s.*$/;
let ls = /^ls\s.*$/;
let mkdir = /^mkdir\s.*$/;
let rm = /rm\s.*$/;
/*
*函数名称：getInput;
*效果：按下回车时检测输入框中内容;
*返回值：以输入为内容的一个字符串;
*/

export function getInput(event) {
  if (event.keyCode == 13) {
    data.value = document.getElementsByClassName(`input-text`)[0].value;
    Events(data.value);
    data.value = ``

  }
}
document.addEventListener("keydown", getInput);

/*
*函数名称：findFocus;
*效果：刷新焦点到输入框;
*返回值：无;
*/
export function findFocus() {
  terminal_main.input.focus();
}
/*
*函数名称：Events;
*效果：根据传入文本内容选择对应执行函数;
*返回值：无;
*/
export function Events(input) {
  if (echo.test(input)) {
    console.log(echo);
    toEcho(input);
    return;
  }
  if (ls.test(input)) {
    //遍历输出文件名称
  }
  if (mkdir.test(input)) {
    //创建一个文件夹
  }
  if (rm.test(input)) {
    if (input == "rm -r") {
      //删除所有节点
    } else {
      //删除单个文件（夹）
    }
  }
  switch (input) {
    case ``:
      addNewOne();
      break;
    case `clear`:
      toClear();
      break;
    default:
      getError(input);
      break;
  }
}

/*
*函数名称：addNewOne;
*效果：添加一个新的输入框，即重置输入;
*返回值：无;
*/
export function addNewOne() {
  terminal_main.mainpart.innerHTML += "<span>[<span>zyr</span>@<span>user</span> <span>~</span>]% </span><br/>";
}

/*
*函数名称：toClear;
*效果: 实现clear命令效果;
*返回值：无;
*/
export function toClear() {
  terminal_main.mainpart.innerHTML = ``;
}

/*
*函数名称：toEcho;
*效果：实现echo命令效果;
*返回值：无;
*/
export function toEcho(input) {
  let printstring = input.substring(5);
  terminal_main.mainpart.innerHTML += "<span>[<span>zyr</span>@<span>user</span> <span>~</span>]% </span><br/>" + printstring + "<br/>";
}

/*
*函数名称：getError;
*效果：抛出错误同时，重置输入;
*返回值：无;
*/
export function getError(input) {
  terminal_main.mainpart.innerHTML += "<span>[<span>zyr</span>@<span>user</span> <span>~</span>]% </span><br/>command not find " + input + "<br/>";
}
