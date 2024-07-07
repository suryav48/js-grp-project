document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM fully loaded and parsed");
  let addtask = document.getElementById("addTaskbtn");

  addtask.addEventListener("click", function () {
    let taskName = document.getElementById("taskTitle").value;
    let taskdescription = document.getElementById("taskDescription").value;
    let taskDueDate = document.getElementById("taskDueDate").value;
    let taskTags = document.getElementById("taskTags").value;
    let taskUsername = document.getElementById("taskLocation").value;

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
  });

  function updateTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let task = tasks.find((task) => task.id === id);

    document.getElementById("taskTitle").value = task.taskName;
    document.getElementById("taskDescription").value = task.taskdescription;
    document.getElementById("taskDueDate").value = task.taskDueDate;
    document.getElementById("taskTags").value = task.taskTags;
    document.getElementById("taskLocation").value = task.taskUsername;

    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
