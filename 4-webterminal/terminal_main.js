
export let map = new Map();

export const count = 0;
export const mainpart = document.getElementById(`main`);
export const bodypart = document.getElementsByTagName(`body`);
export const input = document.getElementsByClassName(`input-text`)[0];

export class Folder {
  constructor(name, owner) {
    this.name = name;
    this.subordinate_files = new Map();
    this.owner = owner;
    this.date = new Date();
    this.class = `folder`
  }
  addFiles(name, owner, content) {
    this.subordinate_files.set(
      name,
      JSON.stringify(new File(name, owner, this, content))
    );
    map.set(name, JSON.stringify(new File(name, owner, this, content)));
  }
  rmFiles(name) {
    for(let key in this.subordinate_files.keys()){
      if(name === key){
        this.subordinate_files.delete(key);
        map.delete(key)
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
    this.class = `file`;
    this.soft_link = false;
  }
}

let file3 = new File(`file3`, `zyr`, `hallo world`);
let file4 = new File(`file4`, `zyr`, ` what happend`);
let folder1 = new Folder(`folder1`, `zyr`);
let folder2 = new Folder(`.folder2`, `zyr`);
window.localStorage.setItem(folder1.name, JSON.stringify(folder1));
window.localStorage.setItem(folder2.name, JSON.stringify(folder2));
window.localStorage.setItem(file3.name, JSON.stringify(file3));
window.localStorage.setItem(file4.name, JSON.stringify(file4));
folder1.addFiles(`file1`, `zyr`, `there is file1`);
// console.log(folder1.subordinate_files);
folder1.addFiles(`file2`, `zyr`, `there is file2`);
// console.log(folder1.subordinate_files);
map.set(folder1.name,folder1);
// console.log(map.get(`folder1`))
map.set(file3.name,file3);
map.set(folder2.name, folder2);
map.set(file4.name, file4);