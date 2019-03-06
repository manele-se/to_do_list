//REFACTOR!!


//UI variables we need
const form = document.querySelector('#task-form'); 
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter'); 
const taskInput = document.querySelector('#task'); 


//load all event Listeners

loadEventListeners();

//load all event listener: connect DOM with js
function loadEventListeners(){
  //DOM load event: when all the content is loaded, call function get task
 // without any interaction from the user
  document.addEventListener('DOMContentLoaded', getTasks); 
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask); 

  //clear task event 
  clearBtn.addEventListener('click', clearTasks); 

  //filter the tasks
  filter.addEventListener('keyup', filterTasks); 
}

//addTask
function addTask(e){

  if(taskInput.value === ''){
    alert('Add a task'); 
    return; 
  }
  createLi(taskInput.value);
  //store in local storage
  storeTaskInLocalStorage(taskInput.value); 
  //clear input
  taskInput.value='';  
  //prevent the default behaviour of this event. 
   // don't sent to the web server nad reload the site
  e.preventDefault();
} 

//get tasks from ls
function getTasks(){
  let tasks = loadTasksFromLocalStorage(); 
  //for each task append li element so they are visible on the site
  tasks.forEach(createLi);
}

function createLi(task) {
  //create li element for a new task
  const li = document.createElement('li');
   //add class
  li.className = 'collection-item';
   //create text node and append to li 
  li.appendChild(document.createTextNode(task));
  //create new link element 
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  //add icon html for the remove cross
  link.innerHTML = '<i class="fa fa-remove"></i>';
  //append the link to li. It will be placed in the li element
  li.appendChild(link);
  taskList.appendChild(li);
}

//store task
function storeTaskInLocalStorage(task){
  let tasks = loadTasksFromLocalStorage();
  tasks.push(task); 
  //create a string of an object with stringify. Needed to store it in ls
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

function loadTasksFromLocalStorage() {
  let tasks;
  //nothing in there
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

//remove task
function removeTask(e){
  //click target identifies
  if(e.target.parentElement.classList.contains('delete-item')){
    if(confirm('Are you sure?')){
      //remove the li element which contains the task to remove
      e.target.parentElement.parentElement.remove(); 
      //remove from ls. Pass the li element
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); 
   }
  }
}

//clear tasks
function clearTasks(){
  //taskList.innerHTML = ''; 

  //faster
 while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild); 
  }

  //clear tasks from ls
  clearTasksFromLocalStorage(); 
}

//clear from ls
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter tasks calls when the is up
function filterTasks(e){
  const text = e.target.value.toLowerCase();
  
  document.querySelectorAll('.collection-item').forEach(
    function (task){
      //text in the first li element
      const item = task.firstChild.textContent; 
      //if the text in the li element contains the written /filtered text 
      if(item.toLocaleLowerCase().includes(text)){
        //show li element
        task.style.display = 'block'; 

      }else{
        task.style.display = 'none'; 
      }
    }); 
  console.log(text); 
}

//remove from ls
function removeTaskFromLocalStorage(taskItem){
  let tasks = loadTasksFromLocalStorage(); 
  //check the ls and loop throught all the tasks. For each task if the li element is the same as
  //the task
  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1); 
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks)); 
}