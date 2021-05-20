class Storage {
    static getTodoList() {
        let todos;
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'));
        } else {
            todos = [];
        }
        return todos;
    }

    static setTodoList(data) {
        // data is an array of todo-objects, each must be destructured and made
        // into json compatible code
        
        localStorage.setItem('todos', JSON.stringify(data));
    }

    static addTodoTask(todoObj) {
        // console.log(todoObj);
        const title = todoObj.getTitle();
        const desc = todoObj.getDescription();
        const priority = todoObj.getPriority();
        const checked = todoObj.isChecked();
        const task = {title, desc, priority, checked};
        let todo = Storage.getTodoList();
        todo.push(task);
        Storage.setTodoList(todo);
    }

    static removeTodoTask(index) {
        let todos = Storage.getTodoList();
        todos.splice(index, 1);
        Storage.setTodoList(todos);
    }

    static saveCheckStatus(index) {
        let todos = Storage.getTodoList();
        todos[index].checked = !todos[index].checked;
        Storage.setTodoList(todos);
    }

}

export default Storage;