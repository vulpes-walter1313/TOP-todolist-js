import Storage from './storage';
import mainUI from './mainUI';

function moreInfoDisplay() {
  let infoDisplay = document.createElement('div');
  infoDisplay.classList.add('todo-more-info-display-wrapper');
  infoDisplay.classList.add('hide');
  infoDisplay.innerHTML = `
      <div class="todo-more-info-display">
          <p class="todo-more-info-header">Task Detail</p>
          <div class= "todo-more-info-content" id="task-display-details" data-todoid="">
              <p class="more-info-title">Task Title</p>
              <input type="text" id="more-info-task-title" placeholder="My task title">
              <p class="more-info-desc">Task Description</p>
              <input type="textarea" id="more-info-task-desc" placeholder="My task Description">
              <p class="more-info-project">Task Project</p>
              <input type="text" id="more-info-task-project" placeholder="My task Project">
              <p class="more-info-priority">Task Priority</p>
              <input type="number" id="more-info-task-priority" value="3" min="0" max="3">
              <p class="more-info-duedate">Task Due Date</p>
              <input type="date" id="more-info-task-duedate" value="2021-06-03" min="2021-06-02">
              <div class="todo-more-info-btns">
                  <button type="button" data-todoid="" id="details-save-btn">Save</button>
                  <button type="button" id="details-close-btn">Close</button>
              </div>
          </div>
      </div>`;

      // Event listeners
      infoDisplay.addEventListener('click', (e) => {
          e.stopPropagation();
          if (e.target.classList.contains('todo-more-info-display-wrapper')) {
              infoDisplay.classList.toggle('hide');
          }
      });

      let closeBtn = infoDisplay.querySelector("#details-close-btn");
      closeBtn.addEventListener('click', (e)=> {
          e.stopPropagation();
          if (e.target.id === 'details-close-btn') {
              infoDisplay.classList.toggle('hide');
          }
      });
      const saveBtn = infoDisplay.querySelector('#details-save-btn');

      saveBtn.addEventListener('click', saveTaskDetails);
  return infoDisplay;
}

function saveTaskDetails() {
  let todos = Storage.getTodoList();
  const infoDisplay = document.querySelector('.todo-more-info-display-wrapper');
  const taskTitle = document.querySelector('#more-info-task-title');
  const taskDesc = document.querySelector('#more-info-task-desc');
  const taskProject = document.querySelector('#more-info-task-project');
  const taskPriority = document.querySelector('#more-info-task-priority');
  const taskDueDate = document.querySelector('#more-info-task-duedate');

  todos.map(todo => {
      if (todo.getId() == this.dataset.todoid) {
          todo.editTitle(taskTitle.value || taskTitle.getAttribute('placeholder'));
          // console.log(`Task Title: ${taskTitle.value || taskTitle.getAttribute('placeholder')}`);
          todo.editDescription(taskDesc.value || taskDesc.getAttribute('placeholder'))
          // console.log(`Task Description: ${taskDesc.value || taskDesc.getAttribute('placeholder')}`);
          todo.setProject(taskProject.value || taskProject.getAttribute('placeholder'))
          // console.log(`Task Project: ${taskProject.value || taskProject.getAttribute('placeholder')}`);
          todo.editPriority(taskPriority.value)
          // console.log(`Task Priority: ${taskPriority.value}`);
          todo.editDueDate(taskDueDate.value);
          // console.log(`Task DueDate: ${taskDueDate.value}`);
      }
      return todo;
  });
  Storage.setTodoList(todos);
  infoDisplay.classList.toggle('hide');
  mainUI.displayTodos();
}

export default moreInfoDisplay;