import todoFactory from './todoFactory';
class Storage {
    static getTodoList() {
        let todos;
        if (localStorage.getItem('todos')) {
            todos = JSON.parse(localStorage.getItem('todos'));
        } else {
            todos = [];
        }
        todos = todos.map(todo => {
            // Data has to be returned as JS obj with a Todos properties and methods
            return todoFactory(todo.title, todo.desc, todo.priority, todo.checked, todo.id, Date.parse(todo.dueDate), todo.project);
        });
        return todos;
    }

    static setTodoList(data) {
        // data is an array of todo-objects, each must be destructured and made
        // into json compatible code
        let cleanData = data.map(todo => {
            let newObj = { 
                title: todo.getTitle(),
                desc: todo.getDescription(),
                priority: todo.getPriority(),
                checked: todo.isChecked(),
                id: todo.getId(),
                dueDate: todo.getDueDate().toDateString(),
                project: todo.getProject()
            };
            return newObj;
        });
        
        localStorage.setItem('todos', JSON.stringify(cleanData));
    }

    static addTodoTask(todoObj) {
        // console.log(todoObj);
        let todos = Storage.getTodoList();
        todos.push(todoObj);
        Storage.setTodoList(todos);
    }

    static removeTodoTask(id) {
        let todos = Storage.getTodoList();
        todos = todos.filter(todo => todo.getId() !== id);
        Storage.setTodoList(todos);
    }

    static saveCheckStatus(id) {
        let todos = Storage.getTodoList();
        let index = todos.findIndex(todo => todo.getId() == id);
        todos[index].flipChecked();
        Storage.setTodoList(todos);
    }

}

export default Storage;