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


  addtask.addEventListener("click", function () {
    let taskName = document.getElementById("taskTitle").value;
    let taskdescription = document.getElementById("taskDescription").value;
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskTags = document.getElementById("taskTags").value;
    let taskUsername = document.getElementById("taskUsername").value;

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

  function updateTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks.find((task) => task.id === id);

    document.getElementById("taskTitle").value = task.taskName;
    document.getElementById("taskDescription").value = task.taskdescription;
    document.getElementById("taskDueDate").value = task.taskDueDate;
    document.getElementById("taskTags").value = task.taskTags;
    document.getElementById("taskUsername").value = task.taskUsername;

    localStorage.setItem("tasks", JSON.stringify(tasks));
    deleteTask(id);
  }

  function displayTask(showTaskItem) {
    let tasks = showTaskItem || JSON.parse(localStorage.getItem("tasks")) || [];
    let taskContainer = document.querySelector(".search-field");
    taskContainer.innerHTML = '';

    tasks.forEach(task => {
      let task_div = document.createElement('div');
        task_div.classList.add('taskItem');

        let html = `<h4>${task.taskName}</h4>
                    <p>Description: ${task.taskdescription}</p>
                    <p>Due Date: ${task.taskDueDate}</p>
                    <p>Tags: ${task.taskTags}</p>
                    <p>Username: ${task.taskUsername}</h4>
                    <button onclick="updateTask('${task.id}')">EDIT</button>
                    <button onclick="deleteTask('${task.id}')">DELETE</button>`;

        task_div.innerHTML = html;
        taskContainer.appendChild(task_div);
    });
  }

  function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTask(tasks);
  }

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
 
