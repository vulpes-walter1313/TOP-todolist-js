import todoFactory from './todoFactory';
import Storage from './storage';
import { displayTodos } from './mainUI';

function todoFormComponent() {
    let formWrapperDiv = document.createElement('div');
    formWrapperDiv.classList.add('add-todo-form-wrapper');
    formWrapperDiv.classList.add('hide');
    let form = document.createElement('form');
    form.innerHTML = `
        <p>Add Your Todo</p>
        <label for="todo-title-input">Title</label>
        <input type="text" name"todo-title-input" id="todo-title-input">
        <label for="todo-desc-input">Description</label>
        <input type="text" name"todo-desc-input" id="todo-desc-input">
        <label for="todo-prio-input">Priority (0-3)</label>
        <input type="number" name"todo-prio-input" id="todo-prio-input" min="0" max="3">
        <input type="button" value="Add">
    `;
    form.querySelector('input[type="button"]').addEventListener('click', submitTodo);
    formWrapperDiv.appendChild(form);
    return formWrapperDiv;
}

function submitTodo() {
    let todoTitle = document.querySelector('#todo-title-input');
    let todoDesc = document.querySelector('#todo-desc-input');
    let todoPrio = document.querySelector('#todo-prio-input');
    let todo;
    if (todoPrio.valueAsNumber < 4 && todoPrio.valueAsNumber >= 0) {
        todo = todoFactory(todoTitle.value, todoDesc.value, todoPrio.valueAsNumber, checked=false);
    } else { 
        return;
    }
    todoTitle.value = '';
    todoDesc.value = '';
    todoPrio.value = '';
    Storage.addTodoTask(todo);
    displayTodos();

}

export default todoFormComponent;