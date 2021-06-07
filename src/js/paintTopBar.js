function paintTopBar() {
    let topBar = document.createElement('div');
    topBar.classList.add('top-bar');

    topBar.innerHTML = `
    <div class="sidebar-toggle-btn">
        <i class="fas fa-bars"></i>
            <i class="fas fa-times hide"></i>
    </div>
    <div class="app-title">
        <p>TodoList</p>
    </div>`;
    // event listeners
    const sidebarMenuBtn = topBar.querySelector('.sidebar-toggle-btn');
    sidebarMenuBtn.addEventListener('click', () =>{
        const sidebar = document.querySelector('.sidebar-wrapper');
        sidebar.classList.toggle('hide');
    });
    return topBar;
}

export default paintTopBar;