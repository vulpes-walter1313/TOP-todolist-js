function todoFactory(title, description, priority, checked=false, id) {
    
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

    return {editTitle, getTitle, editDescription,
        getDescription, editPriority, getPriority, getId, isChecked, flipChecked};
}

export default todoFactory;