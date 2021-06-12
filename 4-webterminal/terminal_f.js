import * as terminal_main from './terminal_main.js'
document.addEventListener("click", findFocus);
let envirionment = "home";
console.log(terminal_main.map)
// console.log(terminal_main.map.get(`floder1`).subordinate_files)

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
  if(input.indexOf(`|`)>0){
    madePipe(input);
    return;
  }
  if (/^echo\s.*$/.test(input)) {
    return toEcho(input)      ;
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
  if (/^ln\s.*$/.test(input)) {
    madeLn(input);
    return;
  }
  if (/^cd.*$/.test(input)) {
    madeCd(input);
    return;
  }
  if (/^cp.*$/.test(input)) {
    madeCp(input);
    return;
  }
  if(/.*>>.*/.test(input)|| /.*>.*/.test(input)) {
    outputRedirection(input);
    return;
  }
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

  let directory = terminal_main.map.get(arr[arr.length - 1]);
  console.log(directory)
  if (directory === undefined) {
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
  } else {
    for (let key of directory.subordinate_files.keys()) {
      console.log(directory.subordinate_files)
      if (/^\..*$/.test(key)) {
        // console.log(directory.subordinate_files.get(key));
        special_file.push(directory.subordinate_files.get(key));
      } else {
        // console.log(directory.subordinate_files.get(key));
        normal_file.push(directory.subordinate_files.get(key));
      }
    }
    if (input === `ls`) {
      let replace_string = ``;
      for (let i = 0; i < normal_file.length; i++) {
        console.log(normal_file[i]);
        replace_string += `${normal_file[i].name}\t`;
      }
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
      ${replace_string}<br/>`
      terminal_main.input.value = ``;
      return;
    }
  }

  if (input === `ls`) {
    let replace_string = ``;
    for (let i = 0; i < normal_file.length; i++) {
      console.log(normal_file[i]);
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
  let cd_arr = input.substring(3).split(`/`);
  console.log(cd_arr)
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
      let arr = envirionment.split("/");
      arr.pop();
      envirionment = arr.join(`/`);
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
    let arr = envirionment.split("/");
    let directory = terminal_main.map.get(arr[arr.length - 1]);
    console.log(directory)
    directory.subordinate_files.set(new_name, JSON.stringify(new terminal_main.Folder(new_name, `zyr`)));
  } else {
    localStorage.setItem(new_name, JSON.stringify(new terminal_main.Folder(new_name, `zyr`)));
    terminal_main.map.set(new_name, new terminal_main.Folder(new_name, `zyr`));
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
  if (!(input.indexOf(`-`) > 0)) {
    let rm_name = input.substring(3);
    if (envirionment !== `home`) {
      let arr = envirionment.split("/");
      let diractory = terminal_main.map.get(arr[arr.length-1])
      diractory.rmFiles(rm_name);
    } else {
      // console.log(JSON.parse(localStorage.getItem(rm_name)).class);
      if (JSON.parse(localStorage.getItem(rm_name)).class === `folder`) {
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
        ${rm_name} is not a file<br/>`;
        terminal_main.input.value = ``;
        return;
      }
      localStorage.removeItem(rm_name);
    }
  } else {
    //输入带有-r
    let rm_name = input.substring(6);
    if (envirionment !== `home`) {
      let arr = envirionment.split("/");
      let diractory = terminal_main.map.get(arr[arr.length-1])
      console.log(diractory)
      diractory.rmFiles(rm_name);
    } else {
      if (JSON.parse(localStorage.getItem(rm_name)).class === `file`) {
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
  if (envirionment !== `home`) {
    let arr = envirionment.split("/");
    let directory = terminal_main.map.get(arr[arr.length - 1]);
    for (let key of directory.subordinate_files.keys()) {
      if (rep_file === key) {
        let obj = JSON.parse(localStorage.getItem(key));
        obj.date = new Date();
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
        terminal_main.input.value = ``;
        return;
      }
    }
    directory.subordinate_files.set(rep_file, new terminal_main.File(rep_file, `zyr`));
    terminal_main.map.set(rep_file, new terminal_main.File(rep_file, `zyr`));
  } else {
    for (let key in localStorage) {
      if (key === rep_file) {
        let obj = JSON.parse(localStorage.getItem(key));
        obj.date = new Date();
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
        terminal_main.input.value = ``;
        return;
      }
    }
    localStorage.setItem(rep_file,JSON.stringify(new terminal_main.File(rep_file, `zyr`)))
    terminal_main.map.set(rep_file,new terminal_main.File(rep_file, `zyr`))
    console.log(terminal_main.map);
  }
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
  let pur_content = terminal_main.map.get(pur_file);
  console.log(terminal_main.map)//根据文件名字取得对象
  if (pur_content.content) {
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
*函数名称：madeLn;
*效果：实现ln命令效果;
*返回值：无;
*/
function madeLn(input){
  let arr = input.split(` `);
  let target_file=JSON.parse(localStorage.getItem(arr[arr.length-2]));
  let start_file=JSON.parse(localStorage.getItem(arr[arr.length-1]));
  if(start_file&&target_file){
    if(!(input.indexOf(`-`)>0)){
      terminal_main.map.set(start_file.name,terminal_main.map.get(target_file.name))
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
      terminal_main.input.value = ``;
      return;
    }else{//建立软链接
      //
      //
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
      terminal_main.input.value = ``;
      return;
    }

  }else{
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
      ${start_file}or ${target_file} is not find<br/>`;
    terminal_main.input.value = ``;
    return;
  }
}

/*
*函数名称：madeCp;
*效果：模拟cp命令;
*返回值：无;
*/
function madeCp(input){
  let start_file = input.match(/^cp.*\s(\w*)\s(.*)/)[1];
  let end_plase = input.match(/^cp.*\s(\w*)\s(.*)/)[2];
  let start_obj = terminal_main.map.get(start_file);
  // console.log(terminal_main.map.get(start_file))
  if(!(input.indexOf(`-`)>0)){
    if(start_obj.class !== `file`){
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>\n
        ${start_file} is not a file<br/>`;
      terminal_main.input.value = ``;
      return;
    }else{
      let arr = end_plase.split(`/`);
      let plase = arr[arr.length-1];
      let directory = terminal_main.map.get(plase);
      directory.subordinate_files.set(start_file,
        JSON.stringify(JSON.parse(JSON.stringify(terminal_main.map.get(start_file)))));
        terminal_main.map.set(start_file,JSON.parse(JSON.stringify(start_obj)));
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
      terminal_main.input.value = ``;
      return;
    }
  }else{
    if(start_obj.class !==`folder`){
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>\n
        ${start_file} is not a folder<br/>`;
      terminal_main.input.value = ``;
      return;
    }else{
      let arr = end_plase.split(`/`);
      let plase = arr[arr.length-1];
      let directory = terminal_main.map.get(plase);//存的是字符串
      console.log(directory)
      directory.subordinate_files.set(start_file,
        JSON.stringify(JSON.parse(JSON.stringify(terminal_main.map.get(start_file)))));
      terminal_main.map.set(start_file,JSON.parse(JSON.stringify(start_obj)));
      terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
      terminal_main.input.value = ``;
      return;
    }
  }
}

/*
*函数名称：outputRedirection;
*效果：模拟输出重定向，改变File的content内容;
*返回值：无;
*/
function outputRedirection(input) {
  if(/.*>>.*/.test(input)){
    let new_content = input.match(/(\w*).*>>.*/)[1];
    let recive_file = input.match(/.*>>\s*(\w*)/)[1];
    for(let key in localStorage){
      if(key ===recive_file){
        terminal_main.map.get(recive_file).content+=new_content;
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
        terminal_main.input.value = ``;
        return;
      }
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
      ${pur_file} is not exited<br/>`;
    terminal_main.input.value = ``;
    return;
  }else{
    let new_content = input.match(/(\w*).*>.*/)[1];
    let recive_file = input.match(/.*>\s*(\w*)/)[1];
    for(let key in localStorage){
      if(key ===recive_file){
        terminal_main.map.get(recive_file).content=new_content;
        terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>`;
        terminal_main.input.value = ``;
        return;
      }
    }
    terminal_main.mainpart.innerHTML += `<span>></span> ${input}<br/>
      ${pur_file} is not exited<br/>`;
    terminal_main.input.value = ``;
    return;
  }
}

/*
*函数名称：madePipe;
*效果：实现管道效果;
*返回值：无;
*/
function madePipe(input){
  let arr = input.split(`|`);
  for(let i=0;i<arr.length;i++){
    arr[i]= arr[i].trim();
  }
  let a = Events(arr[0]);
  for(let i=0;i<arr.length;i++){
    if(a!==undefined){
      a = Events(arr[i + 1] + a);
    }else{
      a = Events(arr[i+1]);
    }
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
*返回值：echo命令后的字符串;
*/
export function toEcho(input) {
  let printstring = input.substring(5);
  terminal_main.mainpart.innerHTML += "<span>></span>" + input + "<br/>" + printstring + "<br/>";
  terminal_main.input.value = ``;
  return printstring;
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
