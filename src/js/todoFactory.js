function todoFactory(title, description, priority) {
    
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
    function getInfo() {
        return `title: ${title}, Description: ${description}, priority: ${priority}`;
    }

    return {editTitle, getTitle, editDescription,
        getDescription, editPriority, getPriority, getInfo};
}

export default todoFactory;