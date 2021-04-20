// when "add task" button is clicked/submitted, create a new task list item with a checkbox, task text, and delete button
// use input value as task text
const taskInput = document.querySelector('.task');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('.task-list');
const clearAll = document.querySelector('.clear-tasks');
const tasksComplete = document.querySelector('.tasks-complete');
const totalTasks = document.querySelector('.tasks-total');
let checked = 0;

function createNewTask() {
  let taskText = taskInput.value;
  if (taskText === '') {
    alert('Woops! Looks like you forgot to enter a task.');
  } else {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-name';
    const button = document.createElement('button');
    button.textContent = 'X';
    appendChild(taskItem, checkbox);
    appendChild(taskItem, span);
    appendChild(taskItem, button);
    appendChild(taskList, taskItem);
    taskInput.value = '';
    updateTasksTotal();
  }
}

function appendChild(parent, element) {
  parent.appendChild(element);
}

// when a new task is added, the task amount is updated

function updateTasksTotal() {
  const tasks = document.querySelectorAll('.task-item');
  totalTasks.textContent = tasks.length;
}

// when a task is completed, the task completed amount is updated

function updateTasksCompleted(target) {
  if (target.checked) {
    checked++;
    tasksComplete.textContent = checked;
  } else {
    checked--;
    tasksComplete.textContent = checked;
  }
}

// when clicked, all tasks are deleted and counters are reset
function clearAllTasks() {
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(item => {
    item.remove();
  });

  // reset all counters
  checked = 0;
  tasksComplete.textContent = 0;
  totalTasks.textContent = 0;
}

addTaskBtn.addEventListener('click', e => {
  e.preventDefault();
  createNewTask();
});

taskList.addEventListener('change', e => {
  const currentTarget = e.target;
  updateTasksCompleted(currentTarget);
});

clearAll.addEventListener('click', () => {
  clearAllTasks();
});
