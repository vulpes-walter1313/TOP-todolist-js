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
- [ ] Give functionality to projects in sidebar

