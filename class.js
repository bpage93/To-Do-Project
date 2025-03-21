// TodoItem.js
class TodoItem {
    constructor(todoText, index, onDelete) {
        this.todoText = todoText;
        this.index = index;
        this.onDelete = onDelete;
    }

    createElement() {
        const todoID = `todo-${this.index}`;
        const todoLI = document.createElement("li");
        todoLI.className = "todo";
        todoLI.draggable = true;
        todoLI.dataset.index = this.index;

        todoLI.innerHTML = `
            <input id="${todoID}" type="checkbox" />
            <label class="custom-checkbox" for="${todoID}">
                <span class="material-symbols-outlined">check</span>
            </label>
            <span class="todo-text">${this.todoText}</span>
            <button class="delete-button">
                <span class="material-symbols-outlined">delete</span>
            </button>
        `;

        todoLI.querySelector(".delete-button").addEventListener("click", () => {
            this.onDelete(this.index);
        });

        return todoLI;
    }
}

// TodoList.js
class TodoList {
    constructor(container, listId) {
        this.container = container;
        this.listId = listId;
        this.todoListUL = container.querySelector("#todo-list");
        this.allTodos = this.loadTasks() || ["Sample Todo"];
    }

    loadTasks() {
        const lists = JSON.parse(localStorage.getItem("todoLists")) || [];
        const currentList = lists.find((list) => list.id === this.listId);
        return currentList ? currentList.tasks : null;
    }

    saveTasks() {
        const lists = JSON.parse(localStorage.getItem("todoLists")) || [];
        const currentListIndex = lists.findIndex(
            (list) => list.id === this.listId
        );

        if (currentListIndex !== -1) {
            lists[currentListIndex].tasks = this.allTodos;
        } else {
            lists.push({ id: this.listId, tasks: this.allTodos });
        }

        localStorage.setItem("todoLists", JSON.stringify(lists));
    }

    addTodo(todoText) {
        this.allTodos.push(todoText);
        this.updateTodoList();
        this.saveTasks();
    }

    deleteTodo(index) {
        this.allTodos.splice(index, 1);
        this.updateTodoList();
        this.saveTasks();
    }

    updateTodoList() {
        this.todoListUL.innerHTML = "";
        this.allTodos.forEach((todo, index) => {
            const todoItem = new TodoItem(todo, index, (i) =>
                this.deleteTodo(i)
            );
            this.todoListUL.appendChild(todoItem.createElement());
        });
    }
}

// AppController.js
document.addEventListener("DOMContentLoaded", () => {
    const listsContainer = document.getElementById("lists-container");
    const addListButton = document.getElementById("add-list-button");

    function generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    function createTodoList(listId) {
        const listContainer = document.createElement("div");
        listContainer.classList.add("list-container");
        listContainer.dataset.listId = listId;

        listContainer.innerHTML = `
            <div class="list-header">
                <form>
                    <input id="todo-input" type="text" placeholder="new task" autocomplete="off" />
                    <button id="add-button">Add</button>
                </form>
                <button class="delete-list-button">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
            <ul id="todo-list"></ul>
        `;

        listsContainer.appendChild(listContainer);
        const todoList = new TodoList(listContainer, listId);

        listContainer.querySelector("form").addEventListener("submit", (e) => {
            e.preventDefault();
            const todoInput = listContainer.querySelector("#todo-input");
            const todoText = todoInput.value.trim();
            if (todoText.length > 0) {
                todoList.addTodo(todoText);
                todoInput.value = "";
            }
        });

        listContainer
            .querySelector(".delete-list-button")
            .addEventListener("click", () => {
                deleteTodoList(listId, listContainer);
            });
    }

    function deleteTodoList(listId, listContainer) {
        const lists = JSON.parse(localStorage.getItem("todoLists")) || [];
        const updatedLists = lists.filter((list) => list.id !== listId);
        localStorage.setItem("todoLists", JSON.stringify(updatedLists));
        listContainer.remove();
    }

    addListButton.addEventListener("click", () => {
        const listId = generateUniqueId();
        createTodoList(listId);
    });

    const lists = JSON.parse(localStorage.getItem("todoLists")) || [];
    lists.forEach((list) => {
        createTodoList(list.id);
    });

    if (lists.length === 0) {
        createTodoList(generateUniqueId());
    }
});
