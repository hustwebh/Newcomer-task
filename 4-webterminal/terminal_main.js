import * as terminal_f from "./terminal_f.js";


export const count = 0;
export const mainpart = document.getElementById(`main`);
export const bodypart = document.getElementsByTagName(`body`);
export const input = document.getElementsByClassName(`input-text`)[0];
export let envirionment = localStorage;
document.addEventListener("click", terminal_f.findFocus);

export class Folder {
  constructor(name, [], owner) {
    this.name = name;
    this.subordinate_files = [];
    this.owner = owner;
    this.date = new Date();
  }
  addFiles(filename) {
    this.subordinate_files.push(new Folder(filename, [], `zyr`));
  }
  rmFiles(filename) {
    // let del_file;
    for (let i = 0; i < this.subordinate_files.length; i++) {
      if (this.subordinate_files[i].name == filename) {
        // del_file=this.subordinate_files[i];
        this.subordinate_files.splice(i, 1);
        return;
      }
    }
  }
}

export class File {
  constructor(name,owner,content) {
    this.name = name;
    this.owner=owner;
    this.content = content;
    this.date = new Date();
  }
}
let file1 = new File(`file1`,`zyr`, `qwe`);
let file2 = new File(`file2`, `zyr`,`asd`);
let file3 = new File(`file3`, `zyr`,` hallo world`);
let file4 = new File(`file4`, `zyr`,` what happend`);
let floder1 = new Folder(`floder1`, [file1, file2], `zyr`);
let floder2 = new Folder(`.floder2`, [], `zyr`);
window.localStorage.setItem(floder1.name, JSON.stringify(floder1));
window.localStorage.setItem(floder2.name, JSON.stringify(floder2));
window.localStorage.setItem(file3.name, JSON.stringify(file3));
window.localStorage.setItem(file4.name, JSON.stringify(file4));