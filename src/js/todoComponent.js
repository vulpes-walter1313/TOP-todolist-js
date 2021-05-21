import Storage from './storage';
import {displayTodos} from './mainUI';
function createTodoComponent(title, id, checked) {
    let todoComponent = document.createElement('div');
    todoComponent.classList.add('todo-component');
    if (checked) {
        todoComponent.classList.add('checked-todo');
    }
    todoComponent.setAttribute('data-key', id);

    let titleDisplay = document.createElement('p');
    titleDisplay.textContent = title;
    todoComponent.appendChild(titleDisplay);

    let todoOptionsDiv = document.createElement('div');
    todoOptionsDiv.classList.add('todo-options-group');
    todoOptionsDiv.innerHTML = `
    <div>
        <i class="fas fa-ellipsis-h"></i>
    </div>
    <div class="check-btn">
        <i class="fas fa-check"></i>
    </div>
    <div class="trash-btn">
        <i class="fas fa-trash"></i>
    </div>
    `;
    todoComponent.appendChild(todoOptionsDiv);
    todoComponent.querySelector('.trash-btn').addEventListener('click', removeTask);
    todoComponent.querySelector('.check-btn').addEventListener('click', checkDone);
    return todoComponent;

}

function removeTask() {
    // console.dir(this.parentElement.parentElement);
    const id = Number.parseInt(this.parentElement.parentElement.dataset.key);
    Storage.removeTodoTask(id);
    displayTodos();
}

function checkDone() {
    // console.log(this.parentElement.parentElement);
    let task = this.parentElement.parentElement;
    const id = task.dataset.key;
    task.classList.toggle('checked-todo');
    Storage.saveCheckStatus(id);
    displayTodos();
}



export default createTodoComponent;