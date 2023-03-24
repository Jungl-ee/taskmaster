// Model
let todos;
const savedTodos = JSON.parse(localStorage.getItem('todos'));
if (Array.isArray(savedTodos)) {
    todos = savedTodos;
} else {
    todos = [];
}

// Creates Todo
function createTodo() {
    if (document.getElementById('input-task').value == "") {
        return;
    }
    const todo = {
        title: document.getElementById('input-task').value,
        dueDate: document.getElementById('date').value,
        id: new Date().getTime(),
        complete: false,
        editing: false
    }
    todos.push(todo);
    saveTodo();
}

// Removes Todo
function removeTodo(id) {
    todos = todos.filter(function (todo) {
        return todo.id != id;
    })
    saveTodo();
}

// Check Todo
function completeTodo(id) {
    todos.forEach(todo => {
        if (todo['id'] == id) {
            todo['complete'] = !todo['complete'];
        }
    })
    saveTodo();
}

// Edit Todo Mode
function editMode(id) {
    todos.forEach(todo => {
        if (todo['id'] == id) {
            todo['editing'] = true;
        }
    })
    renderList();
}

// Update Todo
function updateTodos(id) {
    todos.forEach(todo => {
        if (todo['id'] == id) {
            if (document.getElementById('update-todo-title').value != "") {
                todo['title'] = document.getElementById('update-todo-title').value;
            }
            todo['dueDate'] = document.getElementById('update-todo-date').value;
            todo['complete'] = false;
            todo['editing'] = false;
        }
    })
    saveTodo();
    renderList();
}

function saveTodo() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Controller
function addTodo() {
    createTodo();
    document.getElementById('input-task').value = ''; // clears input text from input element
    document.getElementById('date').value = '';
    renderList();
}

function deleteTodo(event) {
    const deleteId = event.target.id;
    removeTodo(deleteId);
    renderList();
}

function checkTodo(event) {
    const checkId = event.target.dataset.id;
    completeTodo(checkId);
}

function editTodo(event) {
    const eidtId = event.target.dataset.id;
    editMode(eidtId);
}

function updateTodo(event) {
    const updateId = event.target.dataset.id;
    updateTodos(updateId);
}

// View
function renderList() {
    document.getElementById('todo-list').innerHTML = '';

    todos.forEach(todo => {
        if (todo.editing) {
            const element = document.createElement('div');
            document.getElementById('todo-list').appendChild(element);

            const newTodo = document.createElement('input');
            newTodo.value = todo['title'];
            newTodo.className = 'update-todo-input';
            newTodo.id = 'update-todo-title';
            element.appendChild(newTodo);

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-row';
            element.appendChild(buttonDiv);
            
            const date = document.createElement('input');
            date.type = 'date';
            date.id = 'update-todo-date';
            buttonDiv.appendChild(date);

            const updateButton = document.createElement('button');
            updateButton.innerText = 'Update';
            updateButton.dataset.id = todo.id;
            updateButton.className = 'todo-list-button';
            updateButton.onclick = updateTodo;
            buttonDiv.appendChild(updateButton);
        } else {
            const element = document.createElement('div');
            element.innerText = `${todo.title} ${todo.dueDate}`;
            document.getElementById('todo-list').appendChild(element);
            
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.complete;
            checkbox.dataset.id = todo.id;
            checkbox.onchange = checkTodo;
            element.prepend(checkbox);

            const buttonDiv = document.createElement('div');
            buttonDiv.className = 'button-row';
            element.appendChild(buttonDiv);
    
            const editButton = document.createElement('button');
            editButton.innerText = 'Edit';
            editButton.dataset.id = todo.id;
            editButton.className = 'todo-list-button';
            editButton.onclick = editTodo;
            buttonDiv.appendChild(editButton);
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.id = todo.id;
            deleteButton.className = 'todo-list-button';
            deleteButton.onclick = deleteTodo;
            buttonDiv.appendChild(deleteButton);
        }
    }) 
}

renderList();