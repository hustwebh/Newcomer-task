import * as terminal_f from "./terminal_f.js";
export let map = new Map();

export const count = 0;
export const mainpart = document.getElementById(`main`);
export const bodypart = document.getElementsByTagName(`body`);
export const input = document.getElementsByClassName(`input-text`)[0];
document.addEventListener("click", terminal_f.findFocus);

export class Folder {
  constructor(name, owner) {
    this.name = name;
    this.subordinate_files = new Map();
    this.owner = owner;
    this.date = new Date();
  }
  addFiles(name, owner, content) {
    this.subordinate_files.set(
      name,
      JSON.stringify(new File(name, owner, this, content))
    );
    map.set(name, JSON.stringify(new File(name, owner, this, content)));
  }
  rmFiles(name) {
    for (let key in this.subordinate_files) {
      if (key === name) {
        this.subordinate_files.delete(key);
        map.delete(key);
        return;
      }
    }
  }
}

export class File {
  constructor(name, owner, content) {
    this.name = name;
    this.owner = owner;
    this.content = content;
    this.date = new Date();
  }
}

let file3 = new File(`file3`, `zyr`, `hallo world`);
let file4 = new File(`file4`, `zyr`, ` what happend`);
let floder1 = new Folder(`floder1`, `zyr`);
let floder2 = new Folder(`.floder2`, `zyr`);
window.localStorage.setItem(floder1.name, JSON.stringify(floder1));
map.set(floder1.name, JSON.stringify(floder1));
window.localStorage.setItem(floder2.name, JSON.stringify(floder2));
map.set(floder2.name, JSON.stringify(floder2));
window.localStorage.setItem(file3.name, JSON.stringify(file3));
map.set(file3.name, JSON.stringify(file3));
window.localStorage.setItem(file4.name, JSON.stringify(file4));
map.set(file4.name, JSON.stringify(file4));
floder1.addFiles(`file1`, `zyr`, `there is file1`);
floder1.addFiles(`file2`, `zyr`, `there is file2`);
// console.log(map)正常

console.log(map);
console.log("terminal_main start");
for (let key of map.keys()) {
  console.log(key);
  console.log(map.get(key));
}