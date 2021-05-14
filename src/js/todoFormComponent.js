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
    formWrapperDiv.appendChild(form);
    return formWrapperDiv;
}

export default todoFormComponent;