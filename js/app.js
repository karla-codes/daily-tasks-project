// when "add task" button is clicked/submitted, create a new task list item with a checkbox, task text, and delete button
// use input value as task text
const taskInput = document.querySelector('.task');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('.task-list');

function createNewTask() {
  const taskText = taskInput.value;
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
}

function appendChild(parent, element) {
  parent.appendChild(element);
}

addTaskBtn.addEventListener('click', e => {
  e.preventDefault();
  createNewTask();
});
