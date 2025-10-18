import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
export let completedTasks = JSON.parse(localStorage.getItem('completed-tasks')) || [];
export let uncompletedTasks = JSON.parse(localStorage.getItem('uncompleted-tasks')) || [];
export let inProgressTasks = JSON.parse(localStorage.getItem('inprogress-tasks')) || [];

if (!tasks) {
  tasks = [];
}

function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


export function getTaskDate() {
  const today = dayjs();
  return today.format("dddd, D MMMM");
}

export function generateAllToDo() {
  let todoHtml = '';

  tasks.forEach((todo) => {
    todoHtml += `
    <div class="task-uncompleted-item js-uncompleted-item-${todo.id}">
      <div class="left-item-task">
        <input class="input-check" ${todo.status === "completed" ? 'checked disabled' : ''} type="checkbox">
        <div class="texts-item-task">
          <span>${todo.title}</span>
          <span>${todo.taskDate}</span>
        </div>
      </div>
      <div class="right-item-task js-menu-item" data-task-id="${todo.id}">
        <img src="/images/dashboard/delete.svg"  alt="small menu">
      </div>
    </div>
  `;
  });

  document.querySelector('.js-task-uncompleted-item-container').innerHTML = todoHtml;
}

export function generateCompletedTodo() {
  tasks.forEach((todo) => {
    if (todo.status === "completed") {
      completedTasks.push(todo);
    }

    if (todo.status === "uncompleted") {
      uncompletedTasks.push(todo);
    }

    if (todo.status === "inProgress") {
      inProgressTasks.push(todo);
    }
  })

  let completedHtmlTasks = '';

  completedTasks.forEach((completedTodo) => {
    completedHtmlTasks += `
      <div class="task-uncompleted-item">
        <div class="completed-task-container">
          <div class="left-item-task">
            <input checked disabled type="checkbox">
            <div class="texts-item-task">
              <span>${completedTodo.title}</span>
              <span>${completedTodo.taskDate}</span>
            </div>
          </div>
          <div class="right-item-task">
            <img src="/images/dashboard/three dots.svg" alt="delete">
          </div>
        </div>
      </div>
    `;
  })

  document.querySelector('.js-task-completed-container').innerHTML = completedHtmlTasks;
}

export function generateUnCompletedTodo() {
  uncompletedTasks.forEach((uncompletedTodo) => {

  })
}

export function generateInProgressTodo() {
  inProgressTasks.forEach((inProgressTodo) => {

  })
}

export function addTodo() {
  document.querySelector('#add-task').addEventListener('click', () => {
    const taskTitle = document.querySelector('#task-title');
    const taskStatus = document.querySelector('input[name="task-status"]:checked').value.toString();

    if (taskTitle.value === "") {
      alert("please enter a valid entry...");
    } else {
      tasks.push({
        id: Date.now(),
        title: taskTitle.value,
        taskDate: getTaskDate(),
        status: taskStatus
      });
      document.querySelector('.js-add').style.display = "none";
      taskTitle.value = "";
    }



    generateAllToDo();
    saveToStorage();
  })
}

export function removeFromStorage(taskId) {
  const newtasks = [];
  tasks.forEach((todo) => {
    if (+taskId !== +todo.id) {
      newtasks.push(todo);
    }
  })
  tasks = newtasks;
  saveToStorage();
}



/*<div class="status-color" style="
  width : 20px;
  background-color : blue;
  aspect-ratio : 1 / 1;
  margin-right : 10px;
  border-radius : 100%;">
</div>*/