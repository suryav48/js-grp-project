document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskDescription = document.getElementById('taskDescription').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const dueDate = document.getElementById('dueDate').value;
  const priority = document.getElementById('priority').value;
  const status = document.getElementById('status').value;

  if (!taskDescription || !assignedTo || !dueDate || !priority || !status) {
    alert('Please fill in all fields');
    return;
  }

  const task = {
    id: Date.now(),
    taskDescription,
    assignedTo,
    dueDate,
    priority,
    status
  };

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  clearInputs();
  displayTasks();
}

function editTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  const task = tasks.find(task => task.id === id);

  if (task) {
    document.getElementById('taskDescription').value = task.taskDescription;
    document.getElementById('assignedTo').value = task.assignedTo;
    document.getElementById('dueDate').value = task.dueDate;
    document.getElementById('priority').value = task.priority;
    document.getElementById('status').value = task.status;

    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  displayTasks();
}

function deleteTask(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks();
}

function filterTasks() {
  const searchFilter = document.getElementById('searchFilter').value.toLowerCase();
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => {
    return (
      task.taskDescription.toLowerCase().includes(searchFilter) ||
      task.assignedTo.toLowerCase().includes(searchFilter) ||
      task.dueDate.toLowerCase().includes(searchFilter) ||
      task.priority.toLowerCase().includes(searchFilter) ||
      task.status.toLowerCase().includes(searchFilter)
    );
  });
  displayFilteredTasks(tasks);
}

function displayTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  displayFilteredTasks(tasks);
}

function displayFilteredTasks(tasks) {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskHeader = document.createElement('h2');
    taskHeader.textContent = task.taskDescription;

    const taskDetails = document.createElement('p');
    taskDetails.innerHTML = `
      Assigned to: ${task.assignedTo} <br>
      Due date: ${task.dueDate} <br>
      Priority: ${task.priority} <br>
      Status: ${task.status}
    `;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteTask(task.id);

    taskDiv.appendChild(taskHeader);
    taskDiv.appendChild(taskDetails);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    taskList.appendChild(taskDiv);
  });
}

function loadTasks() {
  displayTasks();
}

function clearInputs() {
  document.getElementById('taskDescription').value = '';
  document.getElementById('assignedTo').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('priority').value = '';
  document.getElementById('status').value = '';
}
