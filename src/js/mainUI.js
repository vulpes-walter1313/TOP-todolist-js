import paintTopBar from './paintTopBar';
import todoFormComponent from './todoFormComponent';
import Storage from './storage';
import createTodoComponent from './todoComponent';
import todoFactory from './todoFactory';

function paintUI() {
    let app = document.querySelector('.app-content');
    app.appendChild(paintTopBar());
    app.appendChild(mainUI());
    app.appendChild(todoFormComponent());
    displayTodos();
    mainUIEventListeners();
}

function mainUI() {
    let main = document.createElement("main");
    main.classList.add('main-ui');
    
    let topLine = document.createElement("div");
    topLine.classList.add('top-line');

    let pending = document.createElement('h2');
    pending.textContent = "Pending";
    topLine.appendChild(pending);

    let select = document.createElement('select');
    select.innerHTML = `
        <option value="All">All</option>
        <option value="Uncompleted">Uncompleted</option>
        <option value="Completed">Completed</option>
    `;
    select.addEventListener('change', displayTodos);
    topLine.appendChild(select);
    
    main.appendChild(topLine);
    main.appendChild(todosList());
    main.appendChild(addTodoBtn());
    return main;
}

function mainUIEventListeners() {
    // Button to add todo unhides form wrapper
    document.querySelector('#add-todo-btn').addEventListener('click', ()=>{
        document.querySelector('.add-todo-form-wrapper').classList.toggle('hide');
    });
    // form wrappers click hides form wrapper
    const formWrapper = document.querySelector('div.add-todo-form-wrapper')
    formWrapper.addEventListener('click', function(e){
        e.stopPropagation();
        if (e.target.classList.contains('add-todo-form-wrapper')) {
            formWrapper.classList.toggle('hide');
        }
    });

}

function todosList() {
    let todosListDiv = document.createElement('div');
    todosListDiv.classList.add('todos-list-container');
    return todosListDiv;
}

function addTodoBtn() {
    let addTodoBtn = document.createElement('button');
    addTodoBtn.classList.add('add-todo-btn');
    addTodoBtn.setAttribute('id', 'add-todo-btn');
    addTodoBtn.setAttribute('type', 'button');
    addTodoBtn.textContent = "Add Todo!";
    return addTodoBtn;
}

function displayTodos() {
    let todos = Storage.getTodoList();
    const todosContainer = document.querySelector('.todos-list-container');
    todosContainer.innerHTML = '';
    const filterValue = document.querySelector('.top-line select').value;
    if (filterValue == 'All') {
        todos.forEach( todo=> {
            let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
            todosContainer.appendChild(todoComp);
            
        });
    } else if (filterValue == 'Uncompleted') {
        todos.forEach( todo=> {
            if (todo.isChecked() == false) {
                let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
                todosContainer.appendChild(todoComp);
            }
        });
    } else if (filterValue == 'Completed') {
        todos.forEach( todo=> {
            if (todo.isChecked() == true) {
                let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
                todosContainer.appendChild(todoComp);
            }
        });

    }
}

export { paintUI, mainUIEventListeners, displayTodos };