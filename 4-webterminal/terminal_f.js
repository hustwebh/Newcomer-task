import * as terminal_main from './terminal_main.js'
  const data = {
    value: '',
  }
/*
*函数名称：getInput;
*效果：按下回车时检测输入框中内容;
*返回值：以输入为内容的一个字符串;
*/
export function getInput(event) {
  if (event.keyCode == 13) {
    data.value = document.getElementsByClassName(`input-text`)[0].value;
    console.log(data.value)
    Events(data.value);
  }
}
document.addEventListener("keydown", getInput);

/*
*函数名称：Events;
*效果：根据传入文本内容选择对应执行函数;
*返回值：无;
*/
export function Events(input) {
  console.log(input)
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
  // let mainpart=document.getElementById(`main`);
  terminal_main.mainpart.innerHTML += "<span>[<span>zyr</span>@<span>user</span> <span>~</span>]% </span><br/>";
  terminal_main.bodypart.style.scrollTop += (mainpart.height);
}

/*
*函数名称：toClear;
*效果: 实现clear命令效果;
*返回值：无;
*/
export function toClear(){
  terminal_main.mainpart.innerHTML = ``;
  terminal_main.bodypart.style.scrollTop = 0;
}

/*
*函数名称：getError;
*效果：抛出错误同时，重置输入;
*返回值：无;
*/
export function getError(input) {
  terminal_main.mainpart.innerHTML += "<span>[<span>zyr</span>@<span>user</span> <span>~</span>]% </span><br/>command not find " + input + "<br/>";
  terminal_main.bodypart.style.scrollTop += 2 * (terminal_main.mainpart.height);
}
