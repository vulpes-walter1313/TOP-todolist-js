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
        <input type="text" name="todo-title-input" id="todo-title-input">
        <label for="todo-desc-input">Description</label>
        <input type="text" name="todo-desc-input" id="todo-desc-input">
        <label for="todo-prio-input">Priority (0-3)</label>
        <input type="number" name="todo-prio-input" id="todo-prio-input" min="0" max="3">
        <label for="todo-project-input">Project</label>
        <input type="text" name="todo-project-input" id="todo-project-input">
        <label for="todo-duedate-input">Due Date</label>
        <input type="date" name="todo-duedate-input" id="todo-duedate-input">
        <input type="button" value="Add">
    `;
    form.querySelector('input[type="button"]').addEventListener('click', submitTodo);
    formWrapperDiv.appendChild(form);
    return formWrapperDiv;
}

function submitTodo() {
    let todoTitle = this.form.querySelector('#todo-title-input');
    let todoDesc = this.form.querySelector('#todo-desc-input');
    let todoPrio = this.form.querySelector('#todo-prio-input');
    let todoDueDate = this.form.querySelector('#todo-duedate-input');
    let todoProject = this.form.querySelector('#todo-project-input');
    let todo;
    let checked = false;
    let id = Date.now();
    if (todoPrio.valueAsNumber < 4 && todoPrio.valueAsNumber > -1) {
        todo = todoFactory(todoTitle.value, todoDesc.value, todoPrio.valueAsNumber, checked, id, todoDueDate.value, todoProject.value.toLowerCase());
    } else { 
        return;
    }
    todoTitle.value = '';
    todoDesc.value = '';
    todoPrio.value = '';
    todoProject.value = '';
    Storage.addTodoTask(todo);
    displayTodos();
    const formWrapperDiv = document.querySelector('.add-todo-form-wrapper');
    formWrapperDiv.classList.toggle('hide');

}

export default todoFormComponent;