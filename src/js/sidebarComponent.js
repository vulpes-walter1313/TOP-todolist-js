import mainUI from './mainUI';
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
          mainUI.displayTodos();
          sidebarWrapper.classList.toggle('hide');
      });
  });
  return sidebarWrapper;
}

export default sideBarComponent;