import './css/index.scss';
import { paintUI } from './js/mainUI';
import todoFactory from './js/todoFactory';
import createTodoComponent from './js/todoComponent';



let todos = [];
todos.push(todoFactory('Eat', 'make Spaget and eat', 3));
todos.push(todoFactory('Walk', 'walk the doggo', 2));
todos.push(todoFactory('Study', 'do the thing with the books', 1));

paintUI();

const todosContainer = document.querySelector('.todos-list-container');
todos.forEach(todo=> {
    let todoComp = createTodoComponent(todo.getTitle());
    todosContainer.appendChild(todoComp);
});
