const input = document.querySelector(".form__input");
const addBtn = document.querySelector(".form__add-btn");
const todoItem = document.querySelector(".todo-item");
const todoList = document.querySelector(".todos-container");
const category = document.querySelector(".form__category");



addBtn.addEventListener("click", addTodoFunc);
todoList.addEventListener("click", checkremoveFunc);
category.addEventListener("click", filterFunc);
document.addEventListener("DOMContentLoaded",getLocalStorge);


function addTodoFunc(e) {
  e.preventDefault();

  if(input.value !== ""){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    const todoDivInner = `<span class="todo-item__todo">${input.value}</span>
      <span class="icon todo-item__check"><i class="fa-regular fa-square-check"></i></span>
      <span class="icon todo-item__edit"><i class="fa-solid fa-pen-to-square"></i></span>
      <span class="icon todo-item__trash"><i class="fa-regular fa-trash-can"></i></span>`;
    todoDiv.innerHTML = todoDivInner;
    todoList.appendChild(todoDiv);

    saveToLocalStorage(input.value);

    input.value = "";
  }
}

function checkremoveFunc(e) {
  const classCheker = [...e.target.classList];
  const todo = e.target.parentElement.parentElement;

  if(classCheker[1] === 'fa-square-check'){
    todo.classList.toggle("completed");
  } else if(classCheker[1] === 'fa-pen-to-square'){

  }else if(classCheker[1] === 'fa-trash-can'){
    removeLocalStorage(todo);
    todo.remove();
  }
}

function filterFunc(e){
    const cat = e.target.value;
    const todos = [...todoList.childNodes];

    todos.forEach(todo=>{
        switch (cat){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveToLocalStorage(todo){
    const savedData = localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")):
    [];

    savedData.push(todo);
    localStorage.setItem("todos",JSON.stringify(savedData));
}

function getLocalStorge(){
    const savedData = localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")):
    [];

    savedData.forEach(item=>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo-item");
        const todoDivInner = `<span class="todo-item__todo">${item}</span>
          <span class="icon todo-item__check"><i class="fa-regular fa-square-check"></i></span>
          <span class="icon todo-item__edit"><i class="fa-solid fa-pen-to-square"></i></span>
          <span class="icon todo-item__trash"><i class="fa-regular fa-trash-can"></i></span>`;
        todoDiv.innerHTML = todoDivInner;
        todoList.appendChild(todoDiv);
    });

}

function removeLocalStorage(todo){
    const saved = JSON.parse(localStorage.getItem("todos"));
    const filtered= saved.filter(item=>item!==todo.children[0].innerText);
    localStorage.setItem("todos",JSON.stringify(filtered));

}