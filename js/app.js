// when "add task" button is clicked/submitted, create a new task list item with a checkbox, task text, and delete button
// use input value as task text
const taskInput = document.querySelector('.task');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('.task-list');
const clearAll = document.querySelector('.clear-tasks');
const tasksComplete = document.querySelector('.tasks-complete');
const totalTasks = document.querySelector('.tasks-total');
const percentage = document.querySelector('.percentage');
const meter = document.querySelector('.meter');
const meterLength = meter.getTotalLength();
let checked = 0;
percentage.textContent = '0%';
meter.style.strokeDasharray = meterLength;
meter.style.strokeDashoffset = meterLength;

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
    addClickEvent(button);
  }
}

// add click event to buttons
function addClickEvent(el) {
  el.addEventListener('click', () => {
    deleteTask(el);
  });
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

// updates percentage of progress
function updatePercentage() {
  const move =
    (meterLength * tasksComplete.textContent) / totalTasks.textContent;
  const meterMovement = meterLength - move;
  const percentValue =
    (tasksComplete.textContent / totalTasks.textContent) * 100;
  percentage.textContent = `${Math.floor(percentValue)}%`;
  meter.style.strokeDashoffset = meterMovement;
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
  percentage.textContent = '0%';
  meter.style.strokeDashoffset = meterLength;
}

// delete individual tasks
function deleteTask(el) {
  const listItem = el.parentNode;
  const tasks = document.querySelectorAll('.task-item');
  listItem.remove();
  updateTasksTotal();
  if (listItem.firstChild.checked) {
    checked--;
    tasksComplete.textContent = checked;
    updatePercentage();
  }
}

addTaskBtn.addEventListener('click', e => {
  e.preventDefault();
  createNewTask();
});

taskList.addEventListener('change', e => {
  const currentTarget = e.target;
  updateTasksCompleted(currentTarget);
  updatePercentage();
});

clearAll.addEventListener('click', () => {
  clearAllTasks();
});
