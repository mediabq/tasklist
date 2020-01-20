//define vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
let taskId = 0;
let tasks;
if(localStorage.getItem('tasks') === null){
    tasks = [];
} else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
}
// Load Event listners
loadEventListners();

function loadEventListners(){
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks)
    form.addEventListener('submit', addTask)
    taskList.addEventListener('click', removeTask)
    clearBtn.addEventListener('click', clearTasks)
    filter.addEventListener('keyup', filterTasks)
}

function getTasks() {
    tasks.forEach(function(task){
        //create the li
        const li = document.createElement('li');
        //add the class
        li.className = 'collection-item';
        //create text node and add to li
        li.appendChild(document.createTextNode(task));
        //create new link
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        link.setAttribute('id', taskId);
        taskId++;
        //add the icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });
}
function addTask(e){
    
    if(taskInput.value === ''){
        alert('Add a Task');
    }
    else {
        //create the li
        const li = document.createElement('li');
        //add the class
        li.className = 'collection-item';
        //create text node and add to li
        li.appendChild(document.createTextNode(taskInput.value));
        //create new link
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        link.setAttribute('id', tasks.length);
        //add the icon
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
        storeTasksInLocalStorage(taskInput.value);
        //clear input
        taskInput.value = '';
    }
    e.preventDefault();
}

function storeTasksInLocalStorage(task){
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();
            //remove from LS function
            removeTaskFromLS(e.target.parentElement.parentElement);
            refreshTasks();
        }
    }
}

function removeTaskFromLS(taskItem) {
    const taskCurrentId = taskItem.firstElementChild.id;
    tasks.splice(taskCurrentId, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function refreshTasks() {
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    taskId = 0;
    getTasks();
}

function clearTasks(e){
    if(confirm('Are you sure?')){
        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
            localStorage.clear();
        }
    }
    e.preventDefault();
}

function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}