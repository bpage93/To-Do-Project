// const todoForm = document.getElementById("form");
// const todoInput = document.getElementById("todo-input");
// const todoListUL = document.getElementById("todo-list");

// let allTodos = JSON.parse(localStorage.getItem("todos")) || []; // Load from Local Storage

// todoForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     addTodo();
// });

// function addTodo() {
//     const todoText = todoInput.value.trim();
//     if (todoText.length > 0) {
//         allTodos.push(todoText);
//         todoInput.value = "";
//         updateTodoList();
//         saveToLocalStorage(); // Save after adding
//     }
// }

// function updateTodoList() {
//     todoListUL.innerHTML = "";
//     allTodos.forEach((todo, todoIndex) => {
//         const todoItem = createTodoItem(todo, todoIndex);
//         todoListUL.appendChild(todoItem);
//     });

//     enableDragAndDrop();
// }

// function createTodoItem(todo, todoIndex) {
//     const todoID = `todo-${todoIndex}`;
//     const todoLI = document.createElement("li");
//     todoLI.className = "todo";
//     todoLI.draggable = true;
//     todoLI.dataset.index = todoIndex;

//     todoLI.innerHTML = `
//         <input id="${todoID}" type="checkbox" />
//         <label class="custom-checkbox" for="${todoID}">
//             <span class="material-symbols-outlined">check</span>
//         </label>
//         <span class="todo-text">${todo}</span>
//         <button class="delete-button">
//             <span class="material-symbols-outlined">delete</span>
//         </button>
//     `;

//     // Delete button functionality
//     todoLI.querySelector(".delete-button").addEventListener("click", () => {
//         allTodos.splice(todoIndex, 1);
//         updateTodoList();
//         saveToLocalStorage(); // Save after deletion
//     });

//     return todoLI;
// }

// // Save to Local Storage
// function saveToLocalStorage() {
//     localStorage.setItem("todos", JSON.stringify(allTodos));
// }

// // Enable drag-and-drop functionality
// function enableDragAndDrop() {
//     const items = document.querySelectorAll(".todo");

//     items.forEach((item) => {
//         item.addEventListener("dragstart", dragStart);
//         item.addEventListener("dragover", dragOver);
//         item.addEventListener("drop", drop);
//         item.addEventListener("dragend", dragEnd);
//     });
// }

// let draggedItem = null;

// function dragStart(e) {
//     draggedItem = this;
//     setTimeout(() => {
//         this.style.opacity = "0.5";
//     }, 0);
// }

// function dragOver(e) {
//     e.preventDefault();
//     const draggingOver = this;

//     const list = [...todoListUL.children];
//     const draggedIndex = list.indexOf(draggedItem);
//     const targetIndex = list.indexOf(draggingOver);

//     if (draggedIndex !== targetIndex) {
//         todoListUL.insertBefore(draggedItem, targetIndex > draggedIndex ? draggingOver.nextSibling : draggingOver);
//     }
// }

// function drop(e) {
//     e.preventDefault();
//     const list = [...todoListUL.children];

//     allTodos = list.map((li) => li.querySelector(".todo-text").textContent);

//     updateTodoList();
//     saveToLocalStorage(); // Save after dragging
// }

// function dragEnd() {
//     this.style.opacity = "1";
// }

// // Load tasks on page load
// updateTodoList();

