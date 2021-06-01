function todoFactory(title, description, priority, checked=false, id, dueDate) {
    // dueDate lives as a string, and only when you use .getDueDate()
    // it will return a Date object.
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

    return {editTitle, getTitle, editDescription,
        getDescription, editPriority, getPriority, getId,
        isChecked, flipChecked, getDueDate, editDueDate};
}

export default todoFactory;