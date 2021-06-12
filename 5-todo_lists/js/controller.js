// import {Todo} from "./todo";
import {Store,Todo} from "./store";

export class Controller {

    constructor() {
        this.store = new Store(() => this.refreshCounterAndList());    
        this.getElements();
        this.addListenners();
        this.initList();
    }

    getElements() {
        this.mainSection = document.querySelector('.main');//body元素
        this.newTodoInput = document.querySelector('.new-todo');//输入框
        this.todoList = document.querySelector('.todo-list');//任务列表ul
        this.btnClearCompleted = document.querySelector('.clear-completed');//清楚器已完成任务按钮
        this.btnFilterAll = document.querySelector('.filter-all');//All按钮
        this.btnFilterActive = document.querySelector('.filter-active');//Active按钮
        this.btnFilterCompleted = document.querySelector('.filter-completed');//Complete按钮
        this.itemLeft = document.querySelector('.todo-count');
    }

    addListenners() {
        this.newTodoInput.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                const item =  new Todo({   //生成一个列表对象
                    content: this.newTodoInput.value
                });
                this.store.addTodo(item);
                this.addTodo(item);
                this.newTodoInput.value = '';
            }
        });
        this.btnClearCompleted.addEventListener('click', () => this.clearAllCompleted());
        this.btnFilterAll.addEventListener('click', (evnet) => this.filterTodo(evnet.target, 'all'));
        this.btnFilterActive.addEventListener('click', (evnet) => this.filterTodo(evnet.target, 'active'));
        this.btnFilterCompleted.addEventListener('click', (evnet) => this.filterTodo(evnet.target, 'completed'));
    }

    refreshCounterAndList() {
        const todos = this.store.getAllTodos();
        let itemsUnchecked = 0;

        todos.forEach(item => {
            if (!item.checked) {
                itemsUnchecked++;
            }
        });

        this.mainSection.style.display = todos.length > 0 ? 'block' : 'none';
        this.itemLeft.innerText = itemsUnchecked + ' item' + (itemsUnchecked < 0 ? 's' : '') + ' left';
    }

    initList() {//初始化列表
        const todos = this.store.getAllTodos(); //浅复制list列表
        todos.forEach(item => this.addTodo(item));
        this.refreshCounterAndList();
    }


    addTodo(todo) {
        let li = document.createElement('li');
        li.setAttribute('data-id', todo.id);

        let input = document.createElement('input');
        input.type = 'checkbox';
        input.classList.add('toggle');
        input.addEventListener('click', () => this.toggleTodo(todo.id));

        if (todo.checked) {
            input.setAttribute('checked', 'checked');
            li.classList.add('completed');
        }

        let label = document.createElement('label');
        label.innerText = todo.content;
        label.addEventListener('dblclick', () => this.editTodo(todo));

        let button = document.createElement('button');
        button.classList.add('destroy');
        button.addEventListener('click', () => this.removeTodo(todo.id));

        li.appendChild(input);
        li.appendChild(label);
        li.appendChild(button);

        this.todoList.appendChild(li);
    }

    filterTodo(element, filter) {   //filters里面按钮判断
        document.querySelectorAll(".filters a").forEach(el => {
            if (el === element) {
                el.classList.add('selected');
            } else {
                el.classList.remove('selected');
            }
        });

        switch (filter) {
            case 'all':
                this.todoList.querySelectorAll("li").forEach(el => el.style.display = 'block');
                break;

            case 'active':
                this.todoList.querySelectorAll("li").forEach(el => {
                    if (el.classList.contains('completed')) {
                        el.style.display = 'none'
                    } else {
                        el.style.display = 'block'
                    }
                });
                break;

            case 'completed':
                this.todoList.querySelectorAll("li").forEach(el => {
                    if (el.classList.contains('completed')) {
                        el.style.display = 'block'
                    } else {
                        el.style.display = 'none'
                    }
                });
                break;
        }
    }

    toggleTodo(id) {
        let li = this.todoList.querySelector("li[data-id='" + id + "']");
        let isChecked = this.store.toggleTodo(id);

        if (isChecked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
    }

    editTodo(todo) {
        let li = this.todoList.querySelector(`li[data-id='${todo.id}']`);
        li.classList.add('editing');

        let input = document.createElement('input');
        input.classList.add('edit');
        input.value = todo.content;
        // input.addEventListener('blur', (evnet) => this.stopEditing(todo.id, evnet.target.value));
        input.addEventListener('keypress', (event) => {
            if (event.keyCode === 13) {
                this.stopEditing(todo.id, event.target.value)
            }
        });

        li.appendChild(input);
        li.querySelector('.edit').focus();
    }

    stopEditing(id, newContent) {
        let li = this.todoList.querySelector(`li[data-id='${id}']`);
        li.classList.remove('editing');
        li.querySelector('.edit').remove();
        li.querySelector('label').innerText = newContent;

        this.store.editTodo(id, newContent);
    }

    removeTodo(id) {
        this.todoList.querySelector(`li[data-id='${id}']`).remove();
        this.store.removeTodo(id);
    }

    clearAllCompleted() {
        this.todoList.querySelectorAll("li.completed").forEach(el => {
           el.remove();
        });

        this.store.clearAllCompleted();
    }
}