const meter = document.querySelector(".meter");
const meterLength = meter.getTotalLength();
const taskInput = document.querySelector(".task-input input");
const addTaskBtn = document.querySelector(".task-input button");
const taskName = document.querySelector(".task-name");
const tasksContainer = document.querySelector(".task-list");
const clearAllTasks = document.querySelector(".clear-button");
const percentage = document.querySelector(".percentage");
const totalTasksCompleted = document.querySelector(".tasks-complete");
const totalTasks = document.querySelector(".tasks-total");
let tasksArray = [];

// set meter dash array/offset
meter.style.strokeDasharray = meterLength;
meter.style.strokeDashoffset = meterLength;

addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  createNewTask();
  updateNumberOfTasks();
  deleteTask();
});

// create a new task WORKS
function createNewTask() {
  const newTask = taskInput.value;

  if (newTask == "") {
    alert("Woops! You forgot to enter a task.");
    return false;
  } else {
    tasksArray.push(newTask);

    const taskHTML = `
    <div class="task-item">
    <input class="task-status" type="checkbox" />
    <svg
      class="circle-checkbox"
      clip-rule="evenodd"
      fill-rule="evenodd"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="1.5"
      version="1.1"
      viewBox="0 0 149 149"
      xml:space="preserve"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="checkbox-circle"
        cx="74.43"
        cy="74.43"
        r="70.264"
        fill="#f5dcd5"
        stroke="#464646"
        stroke-width="8.33px"
      />
      <path
        class="checkmark"
        d="m37.127 78.154l29.166 23.795 45.44-55.038"
        fill="none"
        stroke="none"
        stroke-width="12.5px"
      />
    </svg>
    <label class="task-name" for="task">${newTask}</label>
    <input class="delete-task" type="checkbox" />
    <svg
        class="delete"
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="cross"
          d="M1.34591 1L17 16M16.6541 1L1 16"
          stroke="none"
          stroke-width="2"
        />
      </svg>
  </div>
    `;
    const taskHTMLFragment = document
      .createRange()
      .createContextualFragment(taskHTML);
    tasksContainer.appendChild(taskHTMLFragment);
    taskInput.value = "";

    updateTasksCompleted();
  }
}

// update number of tasks WORKS
function updateNumberOfTasks() {
  const taskItem = Array.prototype.slice.call(
    document.querySelectorAll(".task-item")
  );
  totalTasks.innerHTML = taskItem.length;
}

// update amount of tasks completed WORKS
function updateTasksCompleted() {
  const completeTaskCheckbox = Array.prototype.slice.call(
    document.querySelectorAll(".task-status")
  );
  const checkboxCompleted = [];

  completeTaskCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        checkboxCompleted.push(checkbox);
        totalTasksCompleted.textContent = checkboxCompleted.length;
        updateProgressBar(checkboxCompleted, tasksArray);
      } else {
        checkboxCompleted.pop();
        totalTasksCompleted.textContent = checkboxCompleted.length;
        updateProgressBar(checkboxCompleted, tasksArray);
      }
    });
  });
}

// delete single task
function deleteTask() {
  const deleteTaskCheckbox = Array.prototype.slice.call(
    document.querySelectorAll(".delete-task")
  );
  deleteTaskCheckbox.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      if (e.currentTarget.checked) {
        console.log(e);
        e.target.parentElement.remove();
        updateNumberOfTasks();
        checkCompletedTaskDeleted();
        // if there are no tasks left, reset progress bar
      }
      if (document.querySelectorAll(".task-status:checked").length == 0) {
        meter.style.strokeDashoffset = meterLength;
      }
    });
  });
}

// update amount of task marked completed that get deleted
function checkCompletedTaskDeleted() {
  const currentCompletedTasks = document.querySelectorAll(
    ".task-status:checked"
  );
  const currentTotalTasks = document.querySelectorAll(".task-item");
  totalTasksCompleted.textContent = currentCompletedTasks.length;
  updateProgressBar(currentCompletedTasks, currentTotalTasks);
}

// update progress status % and progress bar
function updateProgressBar(completedTasks, totalTasks) {
  const inverseMovement =
    (meterLength * completedTasks.length) / totalTasks.length;
  const meterMovement = meterLength - inverseMovement;
  const percentCompleted = (completedTasks.length / totalTasks.length) * 100;
  if (percentCompleted > 0) {
    percentage.textContent = `You\'re ${Math.floor(percentCompleted)}% there!`;
  } else {
    percentage.textContent = `Let\'s do this!`;
  }
  meter.style.strokeDashoffset = meterMovement;
}

// clear all tasks
clearAllTasks.addEventListener("click", () => {
  const taskItems = document.querySelectorAll(".task-item");
  taskItems.forEach((item) => {
    item.remove();
    tasksArray = [];
  });
  updateNumberOfTasks();
  checkCompletedTaskDeleted();
  meter.style.strokeDashoffset = meterLength;
  percentage.textContent = `Let's do this!`;
});
