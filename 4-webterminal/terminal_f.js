import * as terminal_main from './terminal_main.js'
// const data = {
//   value: '',
// }

/*
*函数名称：getInput;
*效果：按下回车时检测输入框中内容;
*返回值：以输入为内容的一个字符串;
*/
function getInput(event) {
  if (event.keyCode == 13) {
    terminal_main.input.value = document.getElementsByClassName(`input-text`)[0].value;
    Events(terminal_main.input.value);
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
  if (/^echo\s.*$/.test(input)) {
    toEcho(input);
    return;
  }
  if (/^ls.*$/.test(input)) {
    madeLs(input);
    return;
  }
  if (/^mkdir\s.*$/.test(input)) {
    madeMkdir(input);
    return;
  }
  if (/rm\s.*$/.test(input)) {
    madeRm(input);
    console.log(1)
    return;
  }
  if (/touch\s.*$/.test(input)) {
    madeTouch(input);
    return;
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
*函数名称：madeLs;
*效果：实现ls命令效果;
*返回值：无;
*/
function madeLs(input) {

  let normal_file = new Array();
  let special_file = new Array();
  for (let key in localStorage) {//这里key就是文件的name属性
    if (!localStorage.hasOwnProperty(key)) {
      continue; // 跳过像 "setItem"，"getItem" 等这样的键
    }
    if (/^\..*$/.test(key)) {
      special_file.push(JSON.parse(localStorage.getItem(key)));
    } else {
      normal_file.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  // console.log(`test`);
  if (input == `ls`) {

    let replace_string = ``;
    for (let i = 0; i < normal_file.length; i++) {
      replace_string += `${normal_file[i].name}\t`;
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  if (input == `ls -l`) {
    let replace_string = ``;
    for (let i = 0; i < normal_file.length; i++) {
      for (let key in normal_file[i]) {
        replace_string += normal_file[i][key];
      }
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  if (input == `ls -a`) {
    let replace_string = ``;
    let files = normal_file.concat(special_file);
    for (let i = 0; i < files.length; i++) {
      replace_string += `${files[i].name}\t`;
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  terminal_main.input.value = ``;
}




/*
*函数名称：madeMkdir;
*效果：实现mkdir命令效果;
*返回值：无;
*/
function madeMkdir(input) {
  let new_name = input.substring(6);
  if (terminal_main.envirionment != localStorage) {
    terminal_main.envirionment.addFiles(new_name)
  } else {
    localStorage.setItem(new_name, JSON.stringify(new terminal_main.Folder(new_name, [], `zyr`)));
  }
  terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
  terminal_main.input.value = ``;
}

/*
*函数名称：madeRm;
*效果：实现rm命令效果;
*返回值：无;
*/
function madeRm(input) {
  let rm_name = input.substring(3);
  if (terminal_main.envirionment != localStorage) {
    terminal_main.envirionment.rmFiles(rm_name);
  } else {
    localStorage.removeItem(rm_name);
  }
  terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
  terminal_main.input.value = ``;
}
/*
*函数名称：madeTouch;
*效果：实现touch命令效果;
*返回值：无;
*/
function madeTouch(input) {
  let rep_file = input.substring(6);
  for (let key in localStorage) {
    if (key.name == rep_file) {
      key.date = new Date();
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
      terminal_main.input.value = ``;
      return;
    }
  }
  localStorage.setItem(rep_file, JSON.stringify(new terminal_main.File(rep_file, `zyr`, ``)))
  terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
  terminal_main.input.value = ``;
  return;
}
/*
*函数名称：addNewOne;
*效果：添加一个新的输入框，即重置输入;
*返回值：无;
*/
export function addNewOne() {
  terminal_main.mainpart.innerHTML += "<span>></span><br/>";
}

/*
*函数名称：toClear;
*效果: 实现clear命令效果;
*返回值：无;
*/
export function toClear() {
  terminal_main.mainpart.innerHTML = ``;
  terminal_main.input.value = ``;
}

/*
*函数名称：toEcho;
*效果：实现echo命令效果;
*返回值：无;
*/
export function toEcho(input) {
  let printstring = input.substring(5);
  terminal_main.mainpart.innerHTML += "<span>></span>" + input + "<br/>" + printstring + "<br/>";
  terminal_main.input.value = ``;
}

/*
*函数名称：getError;
*效果：抛出错误同时，重置输入;
*返回值：无;
*/
export function getError(input) {
  terminal_main.mainpart.innerHTML += "<span>></span>" + input + "<br/>" + "command not find " + input + "<br/>";
  terminal_main.input.value = ``;
}
