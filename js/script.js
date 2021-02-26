const meter = document.querySelector(".meter");
const meterLength = meter.getTotalLength();
const taskInput = document.querySelector(".task-input input");
const addTaskBtn = document.querySelector(".task-input button");
const taskName = document.querySelector(".task-name");
const tasksContainer = document.querySelector(".task-list");
const deleteTaskBtn = document.querySelector(".delete-task");
const clearAllTasks = document.querySelector(".clear-button");
const percentage = document.querySelector(".percentage");
const totalTasksCompleted = document.querySelector(".tasks-complete");
const totalTasks = document.querySelector(".tasks-total");
const tasksArray = [];
const tasksCompletedArray = [];
let addTasksCompleted = 0;

// set meter dash array/offset
meter.style.strokeDasharray = meterLength;
meter.style.strokeDashoffset = meterLength;

// create a new task
addTaskBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const newTask = taskInput.value;
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
    <button class="delete-task">
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
    </button>
  </div>
    `;
  const taskHTMLFragment = document
    .createRange()
    .createContextualFragment(taskHTML);
  tasksContainer.appendChild(taskHTMLFragment);
  taskInput.value = "";
  const checkbox = document.querySelectorAll(".task-status");
  const checkboxArray = [...checkbox];
  console.log(checkboxArray);
  updateTasksCompleted(checkboxArray);
  updateNumberOfTasks(tasksArray);
});

// update number of tasks
function updateNumberOfTasks(arr) {
  totalTasks.innerHTML = arr.length;
}

// update amount of tasks completed
function updateTasksCompleted(arr) {
  const checkboxCompleted = [];
  arr.forEach((checkbox) => {
    checkbox.addEventListener("click", () => {
      if (checkbox.checked) {
        checkboxCompleted.push(checkbox);
        totalTasksCompleted.textContent = checkboxCompleted.length;
      } else {
        checkboxCompleted.pop();
        totalTasksCompleted.textContent = checkboxCompleted.length;
      }
    });
  });
}

// update progress status %

// update progress bar

// change state of task when task is complete
// update task text with dash across text
// update number of tasks completed
// update progress bar

// delete task
// clear all tasks

const taskDiv = document.createElement("div");
//   const taskCheckbox = document.createElement("input");
//   const taskLabel = document.createElement("label");
//   const taskDeleteButton = document.createElement("button");
//   const checkmarkSvg = `
//   <svg
//   class="circle-checkbox"
//   clip-rule="evenodd"
//   fill-rule="evenodd"
//   stroke-linecap="round"
//   stroke-linejoin="round"
//   stroke-miterlimit="1.5"
//   version="1.1"
//   viewBox="0 0 149 149"
//   xml:space="preserve"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <circle
//     class="checkbox-circle"
//     cx="74.43"
//     cy="74.43"
//     r="70.264"
//     fill="#f5dcd5"
//     stroke="#464646"
//     stroke-width="8.33px"
//   />
//   <path
//     class="checkmark"
//     d="m37.127 78.154l29.166 23.795 45.44-55.038"
//     fill="none"
//     stroke="none"
//     stroke-width="12.5px"
//   />
// </svg>
//   `;
//   const deleteSvg = `
//   <svg
//   class="delete"
//   width="18"
//   height="17"
//   viewBox="0 0 18 17"
//   fill="none"
//   xmlns="http://www.w3.org/2000/svg"
// >
//   <path
//     class="cross"
//     d="M1.34591 1L17 16M16.6541 1L1 16"
//     stroke="none"
//     stroke-width="2"
//   />
// </svg>
//   `;
//   taskDiv.classList.add("task-item");
//   taskCheckbox.classList.add("task-status");
//   taskLabel.classList.add("task-name");
//   taskDeleteButton.classList.add("delete-task");
//   taskDeleteButton.innerHTML = deleteSvg;
//   taskDiv.appendChild(taskCheckbox);
//   taskDiv.insertAdjacentHTML("afterbegin", checkmarkSvg);
//   taskDiv.appendChild(taskLabel);
//   taskDiv.appendChild(taskDeleteButton);
//   tasksContainer.appendChild(taskDiv);
