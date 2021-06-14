import paintTopBar from './paintTopBar';
import todoFormComponent from './todoFormComponent';
import Storage from './storage';
import createTodoComponent from './todoComponent';
import toTitleCase from './toTitleCase';

const mainUI = (function() {
    // Start of IFEE
    function paintUI() {
        let app = document.querySelector('.app-content');
        app.appendChild(paintTopBar());
        app.appendChild(mainUI());
        app.appendChild(todoFormComponent());
        app.appendChild(moreInfoDisplay());
        app.appendChild(sideBarComponent());
        displayTodos();
        mainUIEventListeners();
    }
    
    function mainUI() {
        let main = document.createElement("main");
        main.classList.add('main-ui');
        
        let topLine = document.createElement("div");
        topLine.classList.add('top-line');
    
        let headlineContainer = document.createElement('div');
        headlineContainer.classList.add('top-line-group-one');
    
        let headline = document.createElement('h2');
        headline.textContent = "Todos";
    
        let currentProjectComp = document.createElement('button');
        currentProjectComp.setAttribute('type', 'button');
        currentProjectComp.textContent = `Project: All`;
        currentProjectComp.classList.add('top-line-cp-btn');
    
        headlineContainer.appendChild(headline);
        headlineContainer.appendChild(currentProjectComp);
    
        topLine.appendChild(headlineContainer);
    
    
        let select = document.createElement('select');
        select.innerHTML = `
            <option value="All">All</option>
            <option value="Uncompleted">Uncompleted</option>
            <option value="Completed">Completed</option>
        `;
        // event listeners
        select.addEventListener('change', function() {
            displayTodos();
        });
        topLine.appendChild(select);
        currentProjectComp.addEventListener('click', function(e) {
            e.stopPropagation();
            const todosListContainer = document.querySelector('.todos-list-container');
            todosListContainer.setAttribute('data-project', 'all');
            currentProjectComp.textContent = 'Project: All';
            displayTodos();
        });
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
        todosListDiv.setAttribute('data-listmode', 'all');
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
        // Split todos into pending and do later
        let pendingTodos = [];
        let laterTodos = [];
    
        todos.forEach(todo=>{
            // loop through todos into their date status
            if (todo.getDueDate() <= new Date()) {
                pendingTodos.push(todo);
            } else {
                laterTodos.push(todo);
            }
        });
    
        // display Todos
        const todosContainer = document.querySelector('.todos-list-container');
        todosContainer.innerHTML = '';
        const displayType = todosContainer.dataset.listmode || 'all';
        const displayProject = todosContainer.dataset.project || 'all';
        const filterValue = document.querySelector('.top-line select').value;
        // console.log(`Project is ${displayProject}\nDisplay Type: ${displayType}\nfilter Value: ${filterValue}`);
    
        if (displayType == 'all') {
            let pending = document.createElement('p');
            pending.textContent = 'Pending:';
            pending.classList.add('list-title');
            todosContainer.appendChild(pending);
            writeTodos(pendingTodos, todosContainer, filterValue, displayProject);
            
            let later = document.createElement('p');
            later.textContent = 'Later this week:';
            later.classList.add('list-title');
            todosContainer.appendChild(later);
            writeTodos(laterTodos, todosContainer, filterValue, displayProject);
        } else if (displayType == 'pending') {
            let pending = document.createElement('p');
            pending.textContent = 'Pending:';
            pending.classList.add('list-title');
            todosContainer.appendChild(pending);
            writeTodos(pendingTodos, todosContainer, filterValue, displayProject);
        } else if (displayType == 'later') {
            let later = document.createElement('p');
            later.textContent = 'Later this week:';
            later.classList.add('list-title');
            todosContainer.appendChild(later);
            writeTodos(laterTodos, todosContainer, filterValue, displayProject);
        }
        updateProjectListSidebar();
    }
    
    function writeTodos(todos, todosContainer, filterValue, project) {
        if (todos.length == 0) {
            let message = document.createElement('p');
            message.textContent = "Nothing to do! Have a break!";
            message.classList.add('break-message');
            todosContainer.appendChild(message);
        }
        if (filterValue == 'All') {
            todos.forEach( todo=> {
                if (project == 'all' || todo.getProject() == project) {
                    let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
                    todosContainer.appendChild(todoComp);
                }
                
            });
        } else if (filterValue == 'Uncompleted') {
            todos.forEach( todo=> {
                if (todo.isChecked() === false && (project == 'all' || todo.getProject() == project)) {
                    let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
                    todosContainer.appendChild(todoComp);
                }
            });
        } else if (filterValue == 'Completed') {
            todos.forEach( todo=> {
                if (todo.isChecked() === true && (project == 'all' || todo.getProject() == project)) {
                    let todoComp = createTodoComponent(todo.getTitle(), todo.getId(), todo.isChecked());
                    todosContainer.appendChild(todoComp);
                }
            });
        }
    }
    
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
        displayTodos();
    }
    
    function sideBarComponent() {
        const sidebarWrapper = document.createElement('div');
        sidebarWrapper.classList.add('sidebar-wrapper');
        sidebarWrapper.classList.add('hide');
    
        const sidebar = document.createElement('div');
        sidebar.classList.add('sidebar-menu');
        sidebar.innerHTML = `
        <ul>
            <a data-key="all"><li>All</li></a>
            <a data-key="pending"><li>Pending</li></a>
            <a data-key="later"><li>Later This Week</li></a>
        </ul>
        <div class="sidebar-projects">
            <p>Projects</p>
        </div>
        `;
        
        let projectListElement = document.createElement('div');
        projectListElement.classList.add('projects-list');
    
    
        sidebar.appendChild(projectListElement);
        sidebarWrapper.appendChild(sidebar);
    
        // event listeners
        sidebarWrapper.addEventListener('click', (e)=> {
            e.stopPropagation();
            if (e.target.classList.contains('sidebar-wrapper')) {
                sidebarWrapper.classList.toggle('hide');
            }
        });
    
        let displayTypes = sidebar.querySelectorAll('ul:first-of-type a');
        displayTypes.forEach(type=> {
            type.addEventListener('click', function(e) {
                e.stopPropagation();
                document.querySelector('.todos-list-container').setAttribute('data-listmode', this.dataset.key);
                displayTodos();
                sidebarWrapper.classList.toggle('hide');
            });
        });
        return sidebarWrapper;
    }
    
    // Create a funtion that will update the projects list on the sidebar
    // After every displayTodos()
    
    function updateProjectListSidebar() {
        const sidebarProjectList = document.querySelector('.projects-list');
        sidebarProjectList.innerHTML = '';
        let projects = Storage.getProjectList();
        // Allows an option to show all projects
    
        projects.unshift('all');
        if (projects) {
            const ulElement = document.createElement('ul');
        
            projects.forEach(project => {
                const projectElement = document.createElement('li');
                projectElement.setAttribute('data-projectkey', `${project}`);
                projectElement.textContent = toTitleCase(project);
                ulElement.appendChild(projectElement);
            });
            sidebarProjectList.appendChild(ulElement);
    
            // Set up event Listeners
            const projectsHTMLli = sidebarProjectList.querySelectorAll('li');
            projectsHTMLli.forEach(li => {
                li.addEventListener('click', function() {
                    // e.stopPropagation();
                    // Sets a data-project in the todos container div to the project key
                    const todosContainer = document.querySelector('.todos-list-container');
                    todosContainer.setAttribute('data-project', this.dataset.projectkey);
                    
                    const currentProjectIndicator = document.querySelector('.top-line-cp-btn');
                    currentProjectIndicator.textContent = `Project: ${toTitleCase(this.dataset.projectkey)}`;
                    // Hides sidebar
                    document.querySelector('.sidebar-wrapper').classList.toggle('hide');
                    displayTodos();
                });
            });
        }
    }
    return {paintUI, displayTodos}
    // End of IFEE
})()

export default mainUI;
// export { paintUI, displayTodos }; OG