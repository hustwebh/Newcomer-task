import * as terminal_main from './terminal_main.js'
let envirionment = "home";

// console.log("terminal_f start")
console.log(terminal_main.map)
//error:can't access lexical declaration 'map' before initialization

/*
*函数名称：getInput;
*效果：按下回车时检测输入框中内容;
*返回值：以输入为内容的一个字符串;
*/
function getInput(event) {
  if (event.keyCode === 13) {
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
  if (/^rm\s.*$/.test(input)) {
    madeRm(input);    
    return;
  }
  if (/^touch\s.*$/.test(input)) {
    madeTouch(input);
    return;
  }
  if (/^cat\s.*$/.test(input)) {
    madeCat(input);
    return;
  }
  if (/^cd.*$/.test(input)) {
    madeCd(input);
    return;
  }
  // if(input.search(/>>/)) {
  //   outputRedirection(input);
  //   return;
  // }
  switch (input) {
    case ``:
      addNewOne();
      break;
    case `clear`:
      toClear();
      break;
    case `pwd`:
      madePwd(input);
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
  let arr = envirionment.split("/");
  // console.log(arr)
  // console.log(arr[arr.length - 1])
  
  let directory = JSON.parse(terminal_main.map.get(arr[arr.length - 1]));
  if (arr.length===1) {
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
  }else{
    for(let key in directory.subordinate_files){
      if (/^\..*$/.test(key)) {
        special_file.push(JSON.parse(directory.subordinate_files.get(key)));
      } else {
        normal_file.push(JSON.parse(directory.subordinate_files.get(key)));
      }
    }
  }

  if (input === `ls`) {
    let replace_string = ``;
    for (let i = 0; i < normal_file.length; i++) {
      replace_string += `${normal_file[i].name}\t`;
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  if (input === `ls -l`) {
    let replace_string = ``;
    for (let i = 0; i < normal_file.length; i++) {
      for (let key in normal_file[i]) {
        if (key === `father` || key === `content`) continue;
        replace_string += (normal_file[i][key] + " ");
      }
      replace_string += "<br/>";
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  if (input === `ls -a`) {
    let replace_string = ``;
    let files = normal_file.concat(special_file);
    for (let i = 0; i < files.length; i++) {
      replace_string += `${files[i].name}<br/>`;
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
    ${replace_string}<br/>`
  }
  terminal_main.input.value = ``;
}

/*
*函数名称：madePwd;
*效果：实现pwd命令效果;
*返回值：无;
*/
function madePwd(input) {
  terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
  ${envirionment}<br/>`
  terminal_main.input.value = ``;
}

/*
*函数名称：madeCd;
*效果：实现cd命令效果;
*返回值：无;
*/
function madeCd(input) {
  let cd_arr = input.substring(3).splitQQ图片20210601180742(`/`);
  for (let i = 0; i < cd_arr.length; i++) {
    if (cd_arr[i] === ".") {
      continue;
    } else if (cd_arr[i] === "..") {
      //返回上一级目录，若超过根目录则return
      if (envirionment === `home`) {
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
        you have just arrive home<br/>`
        terminal_main.input.value = ``;
        return;
      }
      // console.log(envirionment.split("/"))
      // console.log(envirionment.split("/").pop())
      // envirionment = envirionment.split("/").pop().join("/");
    } else {
      envirionment += (`/` + cd_arr[i])
    }
  }
  terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`
  terminal_main.input.value = ``;
}
/*
*函数名称：madeMkdir;
*效果：实现mkdir命令效果;
*返回值：无;
*/
function madeMkdir(input) {
  let new_name = input.substring(6);
  if (envirionment !== `home`) {
    // envirionment.addFiles(new_name)
    let arr =envirionment.split("/");
    let directory = JSON.parse(terminal_main.map.get(arr[arr.length - 1]));
    directory.subordinate_files.set(new_name,JSON.stringify(new terminal_main.Folder(new_name,new Map(),`zyr`)));
  } else {
    localStorage.setItem(new_name, JSON.stringify(new terminal_main.Folder(new_name,new Map(), `zyr`)));
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
  if(!(input.indexOf(`-`)>0)){
    if (envirionment !== `home`) {
      envirionment.rmFiles(rm_name);
    } else {
      if(JSON.parse(localStorage.getItem(rm_name)) instanceof terminal_main.Folder){//???
        console.log(1)
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
        ${rm_name} is not a file`;
        terminal_main.input.value = ``;
        return;
      }
      localStorage.removeItem(rm_name);
    }
  }else{
    //输入带有-r
    if (envirionment !== `home`) {
      envirionment.rmFiles(rm_name);
    } else {
      if(JSON.parse(localStorage.getItem(rm_name)) instanceof terminal_main.File){
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
        ${rm_name} is not a folder`;
        terminal_main.input.value = ``;
        return;
      }
      localStorage.removeItem(rm_name);
    }
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
    if (key.name === rep_file) {
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
*函数名称：madeCat;
*效果：实现cat命令;
*返回值：无;
*/
function madeCat(input) {
  let pur_file = input.substring(4);
  // console.log(pur_file);
  // console.log(JSON.parse(localStorage.getItem(pur_file)));
  // for (let key in localStorage) {
  // console.log(key);
  let pur_content = JSON.parse(localStorage.getItem(pur_file));
  if (pur_content) {
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>\n
      ${pur_content.content}<br/>`;
    terminal_main.input.value = ``;
    return;
  } else {
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>\n
      ${pur_file} is not exited<br/>`;
    terminal_main.input.value = ``;
    return;
    // }
  }
}

/*
*函数名称：outputRedirection;
*效果：模拟输出重定向，改变File的content内容;
*返回值：无;
*/
function outputRedirection(input) {
  let print_file = input.match(/(\S*)>+/)[1];
  let recive_file = input.match(/>+(\S*)/)[1];
  if ((localStorage.getItem(print_file)) instanceof terminal_main.File &&
    (localStorage.getItem(recive_file)) instanceof terminal_main.File) {
    if (/*内含两个>>符号*/1) {
      recive_file.content += print_file.content;
    } else if (/*内含一个>符号*/2) {
      recive_file.content = print_file.content
    }
  } else {
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>\n
      this file is not exited<br/>`;
    terminal_main.input.value = ``;
    return;
  }
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
