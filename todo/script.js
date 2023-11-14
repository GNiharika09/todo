inp = document.querySelector('.task-input input')
taskBox_UL = document.querySelector('.task-box')
filtersBtn = document.querySelectorAll('.filters span')
let todos = JSON.parse(localStorage.getItem('todo-list'))
let isEdited = false;
let editID = ''



document.querySelector('.clear-all').addEventListener("click",function(){
    todos.splice(0, todos.length)
    localStorage.setItem('todo-list',JSON.stringify(todos))
    showData_html("all")
})

filtersBtn.forEach(function(b){
    b.addEventListener('click',function(){ 
        showData_html(b.id)
    })
})



function showMenu(el){ 
el.nextElementSibling.classList.add('show')
document.addEventListener('click',function(e){
    if(e.target !== el){
        
    el.nextElementSibling.classList.remove('show')
    }
})
}

function updateTask(id, task){
console.log(id, task)
isEdited = true;
editID = id
inp.value = task
}
function deleteTask(el){
 delId = el.parentElement.parentElement.previousElementSibling.querySelector('input').getAttribute('id')
todos.splice(delId, 1)
localStorage.setItem('todo-list',JSON.stringify(todos))
showData_html("all")
}

function updateState(inpF){ 
if(inpF.checked){
    inpF.parentElement.lastElementChild.classList.add('checked')
    console.log(todos[inpF.id].status)
    todos[inpF.id].status = 'Completed'
}else{
    inpF.parentElement.lastElementChild.classList.remove('checked')
    todos[inpF.id].status = 'Pending'
}
localStorage.setItem('todo-list',JSON.stringify(todos))
}


function showData_html(filterID){
    let li = "";
    
   if(todos){
    todos.forEach(function(todo, id){
        console.log(id, todo)
        if(todo){
        isCompleted =  (todo.status == 'Completed') ? "checked" : ""
        if(filterID == todo.status || filterID == "all"){
        li += ` 
                    <li class="task-list">
                    <label for="${id}" >
                        <input type="checkbox" onclick="updateState(this)" id="${id}" ${isCompleted}>
                        <p class='${isCompleted}'>${todo.name}</p>
                    </label>
                    <div class="settings">
                        <i onclick="showMenu(this)" class="fa fa-ellipsis-h" aria-hidden="true"></i>
                        <ul class="edit-menu">
                            <li onclick="updateTask((${id}), ('${todo.name}'))"> <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Edit</li>
                            <li onclick="deleteTask(this)" > <i class="fa fa-trash-o" aria-hidden="true"></i> Delete</li>
                        </ul>   
                    </div>
                </li>     
        `
    }

    }
       
})
   }
    taskBox_UL.innerHTML = li  
}

inp.addEventListener('keyup',function(e){
    inpValue = inp.value.trim()
         if(e.key === "Enter"){
           
if(!isEdited){
    if(!todos){
        todos = []
    } 
    var inp_obj = {name:inpValue,status:"pending"} 
    todos.push(inp_obj) 
}else{
    todos[editID].name = inp.value
    todos.push(inp_obj) 
    isEdited = false;
}

           
            localStorage.setItem('todo-list',JSON.stringify(todos))
            inp.value = ""
            
showData_html("all")
    }
})



showData_html("all")
