import Storage from './storage';
import mainUI from './mainUI';
import formatTimeHTML from './formatTimeHTML';
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
    <div class="details-btn">
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
    todoComponent.querySelector('.details-btn').addEventListener('click', seeEditDetail);
    return todoComponent;

}

function removeTask() {
    // console.dir(this.parentElement.parentElement);
    const id = Number.parseInt(this.parentElement.parentElement.dataset.key);
    Storage.removeTodoTask(id);
    mainUI.displayTodos();
}

function checkDone() {
    // console.log(this.parentElement.parentElement);
    let task = this.parentElement.parentElement;
    const id = task.dataset.key;
    task.classList.toggle('checked-todo');
    Storage.saveCheckStatus(id);
    mainUI.displayTodos();
}

function seeEditDetail() {
    let detailsForm = document.querySelector('div.todo-more-info-display-wrapper');
    detailsForm.classList.toggle('hide');
    const taskId = this.parentElement.parentElement.dataset.key;
    const taskObj = Storage.getTodoList().find(task => task.getId() == taskId)

    const taskTitle = detailsForm.querySelector('#more-info-task-title');
    const taskTitleValue = taskObj.getTitle();
    const taskDesc = detailsForm.querySelector('#more-info-task-desc');
    const taskDescValue = taskObj.getDescription();
    const taskProject = detailsForm.querySelector('#more-info-task-project');
    const taskProjectValue = taskObj.getProject();
    const taskPriority = detailsForm.querySelector('#more-info-task-priority');
    const taskPriorityValue = taskObj.getPriority();
    const taskDueDate = detailsForm.querySelector('#more-info-task-duedate');
    const taskDueDateValue = taskObj.getDueDate();
    const taskSaveBtn = detailsForm.querySelector("#details-save-btn");

    taskSaveBtn.setAttribute("data-todoid", taskId);
    
    taskTitle.setAttribute("placeholder", taskTitleValue);
    taskTitle.value = '';

    taskDesc.setAttribute("placeholder", taskDescValue);
    taskDesc.value = '';

    taskProject.setAttribute("placeholder", taskProjectValue);
    taskProject.value = '';
    taskPriority.setAttribute("value", taskPriorityValue);
    taskDueDate.setAttribute("value", formatTimeHTML(taskDueDateValue));
    taskDueDate.setAttribute("min", formatTimeHTML(new Date()));
}


export default createTodoComponent;