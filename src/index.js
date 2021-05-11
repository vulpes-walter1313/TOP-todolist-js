import './css/index.scss';
import paintTopBar from './js/paintTopBar';
import mainUI from './js/mainUI';
import todoFactory from './js/todoFactory';
import createTodoComponent from './js/todoComponent';


let todos = [];
todos.push(todoFactory('Eat', 'make Spaget and eat', 3));
todos.push(todoFactory('Walk', 'walk the doggo', 2));
todos.push(todoFactory('Study', 'do the thing with the books', 1));

// console.log(todos);
let app = document.querySelector('.app-content');
app.appendChild(paintTopBar());
app.appendChild(mainUI());

const todosContainer = document.querySelector('.todos-list-container');
todos.forEach(todo=> {
    let todoComp = createTodoComponent(todo.getTitle());
    todosContainer.appendChild(todoComp);
});
