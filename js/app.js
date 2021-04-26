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
let svgHTML = `
  <svg width="18" 
  height="18" 
  viewBox="0 0 18 18" 
  fill="none" 
  xmlns="http://www.w3.org/2000/svg"
  aria-hidden="true"
  focusable="false"
  >
    <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" fill="#FBFBFB" stroke="black"/>
  </svg>
`;

percentage.textContent = '0%';
meter.style.strokeDasharray = meterLength;
meter.style.strokeDashoffset = meterLength;
clearAll.style.display = 'none';

function createNewTask() {
  let taskText = taskInput.value;
  if (taskText === '') {
    alert('Woops! Looks like you forgot to enter a task.');
  } else {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    const checkboxContainer = document.createElement('span');
    checkboxContainer.className = 'checkbox-container';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-status';
    const svg = document.createElement('span');
    svg.innerHTML = svgHTML;
    const span = document.createElement('span');
    span.textContent = taskText;
    span.className = 'task-name';
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-task';
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-task';
    addClickEvent(deleteButton, deleteTask);
    appendChild(checkboxContainer, checkbox);
    appendChild(checkboxContainer, svg);
    appendChild(taskItem, checkboxContainer);
    appendChild(taskItem, span);
    appendChild(taskItem, editButton);
    appendChild(taskItem, deleteButton);
    appendChild(taskList, taskItem);
    updateTasksTotal();
    updateClearAllBtn();
    updatePercentage();
    taskInput.value = '';
  }
}

// show/hide clear all tasks button
function updateClearAllBtn() {
  const tasks = document.querySelectorAll('.task-item');
  if (tasks.length > 0) {
    clearAll.style.display = 'inline';
  } else {
    clearAll.style.display = 'none';
  }
}

// update svg when check box is checked
function updateSVG(target) {
  const svg = target.nextElementSibling;
  const taskText = target.parentNode.nextElementSibling;

  if (target.checked) {
    svg.innerHTML = `
    <svg width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" fill="#000239" stroke="black"/>
    </svg>
    `;
    taskText.style.textDecoration = 'line-through';
    taskText.style.color = 'rgba(0, 0, 0, 0.351)';
  } else {
    svg.innerHTML = `
    <svg width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    >
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" fill="#FBFBFB" stroke="black"/>
    </svg>
    `;
    taskText.style.textDecoration = 'none';
    taskText.style.color = '';
  }
}

// add click event to buttons
function addClickEvent(el, func) {
  el.addEventListener('click', () => {
    func(el);
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
  const numCompleted = tasksComplete.textContent;
  const numTotal = totalTasks.textContent;
  const move = (meterLength * numCompleted) / numTotal;
  const meterMovement = meterLength - move;
  const percentValue = (numCompleted / numTotal) * 100;

  if (percentValue >= 0) {
    percentage.textContent = `${Math.floor(percentValue)}%`;
    meter.style.strokeDashoffset = meterMovement;
  } else {
    resetCounters();
  }
}

// resets all counters
function resetCounters() {
  checked = 0;
  tasksComplete.textContent = 0;
  totalTasks.textContent = 0;
  percentage.textContent = '0%';
  meter.style.strokeDasharray = meterLength;
  meter.style.strokeDashoffset = meterLength;
}

// when clicked, all tasks are deleted and counters are reset
function clearAllTasks() {
  const taskItems = document.querySelectorAll('.task-item');
  taskItems.forEach(item => {
    item.remove();
  });

  resetCounters();
  updateClearAllBtn();
}

// delete individual tasks
const deleteTask = el => {
  const listItem = el.parentNode;
  const checkbox = listItem.childNodes[0].firstChild;
  listItem.remove();
  if (checkbox.checked) {
    checked--;
    tasksComplete.textContent = checked;
  }
  updateTasksTotal();
  updatePercentage();
  updateClearAllBtn();
};

addTaskBtn.addEventListener('click', e => {
  e.preventDefault();
  createNewTask();
});

taskList.addEventListener('change', e => {
  const currentTarget = e.target;

  updateTasksCompleted(currentTarget);
  updateSVG(currentTarget);
  updatePercentage();
});

clearAll.addEventListener('click', () => {
  clearAllTasks();
});
