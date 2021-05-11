function createTodoComponent(title) {
    let todoComponent = document.createElement('div');
    todoComponent.classList.add('todo-component');

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
    return todoComponent;

}

export default createTodoComponent;