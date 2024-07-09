document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");

  let addtask = document.getElementById("addTaskbtn");

  function reset(){
    document.getElementById("taskTitle").value = '';
    document.getElementById("taskDescription").value = '';
    document.getElementById("taskDueDate").value = '';
    document.getElementById("taskTags").value = '';
    document.getElementById("taskUsername").value = '';
  }

  //function to add task into localstorage
  addtask.addEventListener("click", function () {
    let taskName = document.getElementById("taskTitle").value;
    let taskdescription = document.getElementById("taskDescription").value;
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskTags = document.getElementById("taskTags").value;
    let taskUsername = document.getElementById("taskUsername").value;

    //making object of a task to push into localstorage
    const task = {
      id: Math.random().toString(16).slice(2),
      taskName: taskName.trim(),
      taskdescription: taskdescription.trim(),
      taskDueDate: taskDueDate.trim(),
      taskTags: taskTags.trim(),
      taskUsername: taskUsername.trim(),
    };
    let availableTasks = localStorage.getItem("tasks");
    if (availableTasks) {
      let tasks = JSON.parse(availableTasks);
      tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    } else {
      let newTasks = [];
      newTasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }

    displayTask();
    reset();
  });

  //function to update task
  function updateTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks.find((task) => task.id === id);
    document.getElementById("taskTitle").value = task.taskName;
    document.getElementById("taskDescription").value = task.taskdescription;
    document.getElementById("taskDueDate").value = task.taskDueDate;
    document.getElementById("taskTags").value = task.taskTags;
    document.getElementById("taskUsername").value = task.taskUsername;
    document.getElementById("taskUsername").value = task.taskUsername;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    deleteTask(id);
  }
// function to display tasks
  function displayTask(showTaskItem) {
    let tasks = showTaskItem || JSON.parse(localStorage.getItem("tasks")) || [];
    let taskContainer = document.querySelector(".search-field");
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
      let task_div = document.createElement('div');
        task_div.classList.add('taskItem');

        let html = `<h2 class="taskHead">${task.taskName}</h2>
                    <p><p class="taskDetails">Description</p>: ${task.taskdescription}</p>
                    <p><p class="taskDetails">Due Date</p>: ${task.taskDueDate}</p>
                    <p><p class="taskDetails">Tags</p>: ${task.taskTags}</p>
                    <p><p class="taskDetails">Username</p>: ${task.taskUsername}</p>
                    <button class="editTask" onclick="updateTask('${task.id}')">EDIT</button>
                    <button class="deleteTask" onclick="deleteTask('${task.id}')">DELETE</button>`;

        task_div.innerHTML = html;
        taskContainer.appendChild(task_div);
    });
  }
// function to delete task from local storage
  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTask(tasks);
  }
// filter the task when searchTaskBtn button is clicked
    let search = document.getElementById("searchTaskbtn");
    search.addEventListener("click", function () {
    let text = document.getElementById("searchBar").value.toLowerCase();
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    let searchFilter = tasks.filter(task =>
      task.taskName.toLowerCase().includes(text) ||
      task.taskdescription.toLowerCase().includes(text) ||
      task.taskDueDate.toLowerCase().includes(text) ||
      task.taskTags.toLowerCase().includes(text) ||
      task.taskUsername.toLowerCase().includes(text)
    );
      
    displayTask(searchFilter);
  });

  window.updateTask = updateTask;
  window.deleteTask = deleteTask;

  displayTask();
});



  
