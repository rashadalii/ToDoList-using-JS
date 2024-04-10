const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch")



let todos=[];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click",removeTodoToUI);
    clearButton.addEventListener("click",allTodosClear);
    filterInput.addEventListener("keyup",filter);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(todo => {
        addTodoToUI(todo);
    });
}

function filter(e) {
   const filterValue=e.target.value.toLowerCase().trim();
   const todoLists=document.querySelectorAll(".list-group-item");

   if (todoLists.length>0) {
      todoLists.forEach(function(todo){
        if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
            todo.setAttribute("style","display : block");
        } else {
            todo.setAttribute("style","display : none ! important")
        }
      })
    } else {
        showAlert("warning","Axtarish ucun en azi bir element olmalidir!!!")
   }


}

function allTodosClear() {
    const todoLists =document.querySelectorAll(".list-group-item");
    if (todoLists.length>0) {
        // Ui dan silme
        todoLists.forEach(function (todo) {
            todo.remove();
            
        });

        // Storagedan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAlert("success","Butun todolar ugurla silindi");
        
    }else{
        showAlert("warning","Silmek ucun en azi bir todo olmalidir!");
    }
  
}



function removeTodoToUI(e) {
    if (e.target.className==="fa fa-remove") {
        // UI-dan silme
        const todo=e.target.parentElement.parentElement;
        todo.remove();

        // storagedan silme
        removeTodoToStorage(todo.textContent);
        showAlert("success","Todo ugurla silindi.");
    }
}

function removeTodoToStorage(removeTodo) {
  
    checkTodosFromStorage();
    todos = todos.filter(todo => todo.trim().toLowerCase() !== removeTodo.trim().toLowerCase());
    localStorage.setItem("todos", JSON.stringify(todos));
}



function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText==null || inputText==""){
        showAlert("warning","Zehmet olmasa bosh saxlamayin!")
    }else{
    //   interfeyse elave et
    addTodoToUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success","Todo Elave edildi.");
    }
    // storage elave etmek
    e.preventDefault();
}

function addTodoToUI(newTodo) {
    const newTodoItem = `
        <li class="list-group-item d-flex justify-content-between">${newTodo}
            <a href="#" class="delete-item">
                <i class="fa fa-remove"></i>
            </a>
        </li>
    `;
    todoList.innerHTML += newTodoItem;
    addInput.value = "";
}


function addTodoToStorage(newTodo) {
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
    
}



function checkTodosFromStorage() {
    if (localStorage.getItem("todos")===null) {
        todos =[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
}



function showAlert(type, message) {
//     <div class="alert alert-warning" role="alert">
//   A simple warning alert—check it out!
//    </div>
    const div = document.createElement("div");
    div.className = `alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(div);

    setTimeout(() => {
       div.remove(); 
    }, 2500);
}
