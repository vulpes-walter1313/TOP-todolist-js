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
    return topBar;
}

export default paintTopBar;