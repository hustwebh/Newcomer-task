const uuidv4 = require('uuid/v4');//生成唯一识别码
export class Todo {  //定义每个新添加的事件结构

  constructor({id = uuidv4(), content = '', checked = false}) {
      this.id = id;
      this.content = content;
      this.checked = checked;
  }

}


export class Store {

  constructor(callback) {
    this.LSKEY_TODO = 'todo-list'
      this.todoList = JSON.parse(window.localStorage.getItem('todo-list')) || new Array();
      this.refreshCallback = callback;
  }

  addTodo(todo) {
      this.todoList.push(todo);
      this.refreshStorage();
  }

  editTodo(id, content) {
      this.todoList.forEach(newtext => {
          if (newtext.id === id) {
              newtext.content = content;
          }
      });
      this.refreshStorage();
  }

  removeTodo(id) {
      this.todoList = this.todoList.filter(item => item.id !== id);
      this.refreshStorage();
  }

  getAllTodos() {
      return this.todoList.slice(0);
  }

  clearAllCompleted() {
      this.todoList = this.todoList.filter(item => !item.checked);
      this.refreshStorage();
  }

  toggleTodo(id) {
      let isChecked = false;

      this.todoList.forEach(item => {
         if (item.id === id) {
          item.checked = !item.checked;
             isChecked = item.checked;
         }
      });

      this.refreshStorage();
      return isChecked;
  }

  refreshStorage() {
      window.localStorage.setItem(this.LSKEY_TODO, JSON.stringify(this.todoList));
      this.refreshCallback();
  }
}