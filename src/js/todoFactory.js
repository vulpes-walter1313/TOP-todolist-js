function todoFactory(title, description, priority, checked=false, id, dueDate, project='default') {
    // dueDate lives as a string, and only when you use .getDueDate()
    // it will return a Date object.

    // Project is a string
    function editTitle(newTitle) {
        title = newTitle;
    }
    
    function getTitle() {
        return title;
    }

    function editDescription(newDesc) {
        description = newDesc;
    }
    
    function getDescription() {
        return description;
    }
    function editPriority(newPriority) {
        priority = newPriority;
    }
    function getPriority() {
        return priority;
    }
    function isChecked() {
        return checked;
    }
    function flipChecked() {
        checked = !checked;
    }
    function getId() {
        return id;
    }
    function getDueDate() {
        return new Date(dueDate);
    }
    function editDueDate(date) {
        dueDate = date;
    }
    function getProject() {
        return project;
    }
    function setProject(newProject) {
        project = newProject;
    }

    return {editTitle, getTitle, editDescription,
        getDescription, editPriority, getPriority, getId,
        isChecked, flipChecked, getDueDate, editDueDate,
        getProject, setProject};
}

export default todoFactory;