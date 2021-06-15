import paintTopBar from './paintTopBar';
import todoFormComponent from './todoFormComponent';
import Storage from './storage';
import createTodoComponent from './todoComponent';
import toTitleCase from './toTitleCase';
import sideBarComponent from './sidebarComponent';
import moreInfoDisplay from './moreInfoDisplay';

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