## todo-component structure

```HTML
<div class="todo-component">
        <p>Eat</p>
        <div class="todo-options-group">
            <div>...</div>
            <div class="check-btn">C</div>
            <div class="trash-btn">T</div>
        </div>
    </div>
```
## problem to fix
There is a problem with the implementation of the way we select to check and remove tasks.
using a moving index is not sustainable. We need to either create a unique hash or 
utilize an element of a todotask as the key identifier so that we can work with it both in the DOM
and in localStorage.

**Solution**: Use `Date.now()` to produce a unique id that you will store in the task object
and as a `data-key` Element attribute.

## Todos
- [x] Add dates to todos
- [x] Add projects to todos
- [x] built sidebar with projects
- [x] give more info and editability to tasks
- [x] Give functionality to `All`, `Pending`, `Later` in sidebar
- [x] Give functionality to projects in sidebar
- [x] on the `div.top-line`, add a `current project: X` component that when clicked, it resets to `all`. And have the inner text change when sidebar projects are selected.

For the projects in the side bar. Do the same thing you did with `All`, `Pending`, and `Later`.
Make a `data-key` attribute in the `div.todo-list-container` so that you can check the state with
every `displayTodos()` execution.

```HTML
<div class="todo-list-container" data-listmode="all" data-project="work"></div>
```
