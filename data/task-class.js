import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

let personalDetail = JSON.parse(localStorage.getItem('personDetail'));

export class Task {
  tasks;

  constructor() {
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.tasks = JSON.parse(localStorage.getItem(`tasks-${personalDetail.userName}`)) || [];

  }

  saveToStorage() {
    localStorage.setItem(`tasks-${personalDetail.userName}`, JSON.stringify(this.tasks));
  }

  getTaskDate() {
    const today = dayjs();
    return today.format("dddd, D MMMM");
  }

  addTask() {
    const addBtn = document.querySelector('#add-task');
    const taskTitle = document.querySelector('#task-title');

    addBtn.addEventListener('click', () => {
      const taskStatus = document.querySelector('input[name="task-status"]:checked').value;

      if (!taskTitle.value.trim()) {
        alert("please enter a valid entry...");
      }

      const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        taskDate: this.getTaskDate(),
        status: taskStatus,
        userId: personalDetail.id
      };

      this.tasks.push(newTask);
      this.saveToStorage();
      taskTitle.value = "";
      document.querySelector('.js-add').style.display = "none";
      this.generateTasksByStatus();
      this.getStatus();
    });
  }

  generateTasksByStatus() {

    //set hello message to person
    let profileDetail = JSON.parse(localStorage.getItem('personDetail'));
    document.querySelector('#dashboard-title').innerText = `Welcome back, ${profileDetail.firstName + profileDetail.lastName}`;

    //content main container
    const completedContainer = document.querySelector('.js-task-completed-container');
    const uncompletedContainer = document.querySelector('.js-task-uncompleted-item-container');

    completedContainer.innerHTML = "";
    uncompletedContainer.innerHTML = "";

    //forEach in tasks array
    this.tasks.forEach((todo) => {
      //taskItem is parrent of items we create it
      const taskItem = document.createElement('div');
      //add style classes to the taskItem
      taskItem.classList.add(`task-uncompleted-item`, `js-uncompleted-item-${todo.id}`);
      //add childs of taskItem
      const leftSection = document.createElement("div");
      leftSection.classList.add('left-item-task');
      //add checkbox to leftSection to check complete
      const inputCheck = document.createElement("input");
      inputCheck.type = "checkbox";
      if (todo.status === "completed") {
        inputCheck.checked = true;
      }
      inputCheck.classList.add('input-check', 'js-check-completed-by-status');
      inputCheck.dataset.todoId = todo.id;
      //add text to this element
      const textsDivElement = document.createElement("div");
      textsDivElement.classList.add('texts-item-task');
      //add childs of textsDivElement
      const spanTitle = document.createElement('span');
      spanTitle.textContent = todo.title;
      const spanDate = document.createElement('span');
      spanDate.textContent = todo.taskDate;

      //append Childs left Section
      textsDivElement.appendChild(spanTitle);
      textsDivElement.appendChild(spanDate);
      leftSection.appendChild(inputCheck);
      leftSection.appendChild(textsDivElement);

      //add rightSection
      const rightSection = document.createElement('div');
      rightSection.classList.add('right-item-task', 'js-menu-item');
      rightSection.dataset.todoId = todo.id;
      //add childs of rightSection
      const imageDelete = document.createElement('img');
      imageDelete.setAttribute('src', 'images/dashboard/delete.svg');

      //appendChilds right section
      rightSection.appendChild(imageDelete);

      //combine all
      taskItem.appendChild(leftSection);
      taskItem.appendChild(rightSection);

      uncompletedContainer.appendChild(taskItem);

      if (todo.status === "completed") {
        const newTaskItem = taskItem.cloneNode(true);
        const deleteBtn = newTaskItem.childNodes[1];

        deleteBtn.addEventListener('click', () => {
          this.removeFromStorage(todo.id);
        })
        completedContainer.appendChild(newTaskItem);
      }

      rightSection.addEventListener('click', () => {
        this.removeFromStorage(todo.id);
      })

      this.getStatus();
    })
  }

  removeFromStorage(taskId) {
    taskId = +taskId;
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.saveToStorage();
    this.generateTasksByStatus();
    this.getStatus();
  }

  generateAllTasks() {
    const contentContainer = document.querySelector('.content');

    contentContainer.innerHTML = "";

    this.tasks.forEach((todo) => {

      //create taskItem Container
      const taskItem = document.createElement('div');
      //add class to the item
      taskItem.classList.add('task-item-container');

      //left section
      const leftSection = document.createElement('div');
      leftSection.classList.add('left-section');

      //input in first div
      const inputCheck = document.createElement("input");
      inputCheck.type = "checkbox";
      if (todo.status === "completed") {
        inputCheck.checked = true;
      }
      inputCheck.classList.add('input-check', 'js-check-completed-by-status');
      inputCheck.setAttribute("data-todo-id", `${todo.id}`);

      //first div child for text and titles of todo
      const textsDivElement = document.createElement("div");
      textsDivElement.classList.add('texts-item-task');
      //add childs of textsDivElement
      const spanTitle = document.createElement('span');
      spanTitle.textContent = todo.title;
      const spanDate = document.createElement('span');
      spanDate.textContent = todo.taskDate;

      //append childs
      textsDivElement.appendChild(spanTitle);
      textsDivElement.appendChild(spanDate);
      leftSection.appendChild(inputCheck);
      leftSection.appendChild(textsDivElement);


      //right section
      const rightSection = document.createElement('div');
      //add class to right section container
      rightSection.classList.add('right-section');
      //add button delete to right section
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-task', 'js-delete-task');
      deleteButton.dataset.deleteId = todo.id;
      //add delete svg to button
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash"
          viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
        </svg>
      `;

      //add edit button to right section
      const editButton = document.createElement('button');
      editButton.classList.add('edit-task', 'js-edit-task');
      editButton.dataset.editId = todo.id;
      editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
          class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path
            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
          <path fill-rule="evenodd"
            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
        </svg>
      `;

      rightSection.appendChild(deleteButton);
      rightSection.appendChild(editButton);

      //combine all
      taskItem.appendChild(leftSection);
      taskItem.appendChild(rightSection);

      contentContainer.appendChild(taskItem);

      deleteButton.addEventListener('click', () => {
        this.removeFromMyTasks(todo.id);
      })

      inputCheck.addEventListener('click', () => {
        this.checkCompleted(todo.id);
      })

      editButton.addEventListener('click', () => {
        let todoEdit;
        const editBox = document.querySelector('.js-edit');
        const spanEdit = document.querySelector('.js-todo-title-edit');
        const editInputBox = document.querySelector('.js-edit-input');
        editBox.style.display = "flex";

        this.tasks.forEach((task) => {
          if (task.id === +todo.id) {
            editInputBox.value = '';
            todoEdit = todo;
            spanEdit.innerText = todoEdit.title;
          }
        });

        document.querySelector('.js-submit-edit').addEventListener('click', () => {
          this.editTasks(todoEdit);
        });
      })
    });
  }

  editTasks(todoEdit) {
    const editBox = document.querySelector('.js-edit');
    const editInputBox = document.querySelector('.js-edit-input');

    if (editBox.style.display === "flex") {
      if (editInputBox.value !== "") {
        todoEdit.title = editInputBox.value.trim();
        editBox.style.display = "none";
        this.generateAllTasks();
        this.saveToStorage();
      } else {
        alert("please enter a valid entry...");
      }
    }
  }

  addTaskAll() {
    const addBtn = document.querySelector('#add-task');
    const taskTitle = document.querySelector('#task-title');

    addBtn.addEventListener('click', () => {
      const taskStatus = document.querySelector('input[name="task-status"]:checked').value;

      if (!taskTitle.value.trim()) {
        alert("please enter a valid entry...");
      }

      const newTask = {
        id: Date.now(),
        title: taskTitle.value,
        taskDate: this.getTaskDate(),
        status: taskStatus
      };

      this.tasks.push(newTask);
      this.saveToStorage();
      taskTitle.value = "";
      document.querySelector('.js-add').style.display = "none";
      this.generateAllTasks();
    });
  }

  checkCompleted(todoId) {
    let shareTodo;
    let isComplete = false;

    this.tasks.forEach((todo) => {
      if (+todoId === todo.id) {
        shareTodo = todo;
      }
    })

    if (shareTodo.status === "completed") {
      isComplete = false;
      shareTodo.status = "uncompleted";
    } else if (shareTodo.status === "uncompleted") {
      isComplete = true;
      shareTodo.status = "completed";
    }

    this.saveToStorage();
    this.getStatus();
  }

  addEventListener(task) {
    document.querySelectorAll('.js-check-completed-by-status').forEach((e) => {
      e.addEventListener('click', () => {
        const todoId = e.dataset.todoId;
        task.checkCompleted(todoId);
        task.generateTasksByStatus();
        this.addEventListener(task);
      })
    })
  }

  removeFromMyTasks(deleteId) {
    this.tasks = this.tasks.filter(task => task.id !== +deleteId);
    this.saveToStorage();
    this.generateAllTasks();
  }

  renderCalendar() {
    document.querySelector('.js-calendar').addEventListener('click', () => {
      const calendarBox = document.querySelector('.js-calendar-box');
      if (calendarBox.style.display === "flex") {
        calendarBox.style.display = "none";
      } else {
        calendarBox.style.display = "flex";
      }

      const calendar = new FullCalendar.Calendar(calendarBox, {
        initialView: 'dayGridMonth',
        events: []
      });
      calendar.render();
    })
  }

  openNotification() {
    document.querySelector('.js-notification').addEventListener('click', () => {
      const box = document.querySelector('.js-notification-box');
      if (box.style.display === "flex") {
        box.style.display = "none";
      } else {
        box.style.display = "flex";
      }
    })
  }

  logoutSystem() {
    document.querySelector('.js-logout').addEventListener('click', () => {
      location.href = "../index.html";
    })
  }

  shareWeb() {
    document.querySelector('.js-share-btn').addEventListener('click', () => {
      const shareBox = document.querySelector('.js-share-apps-box');
      if (shareBox.style.height === "60px") {
        document.querySelector('.js-share-apps-box').style.height = "0";
      } else {
        document.querySelector('.js-share-apps-box').style.height = "60px";
        document.querySelector('.js-invite-box-container').style.borderRadius = "0 0 1rem 1rem";
      }
    })
  }

  alertHelp() {
    document.querySelector('.js-item-container-help').addEventListener('click', () => {
      const promptHelp = prompt("please enter you request", "I have issue");
      if (promptHelp !== "") {
        alert("We send your issue to manager");
      } else {
        alert("please enter a valid text...");
      }
    })
  }

  getStatus() {
    const progressCompleted = document.querySelector('.task-status-completed > .progress');
    const progressCompletedValue = document.querySelector('.task-status-completed > .progress > span');
    const progressInProgress = document.querySelector('.task-status-in-progress > .progress');
    const progressInProgressValue = document.querySelector('.task-status-in-progress > .progress > span');
    const progressUnCompleted = document.querySelector('.task-status-not-started > .progress');
    const progressUnCompletedValue = document.querySelector('.task-status-not-started > .progress > span');

    const progressValueArray = [
      {
        progressStartValue: 0,
        progressEndValue: 20,
        speed: 10
      }, {
        progressStartValue: 0,
        progressEndValue: 54,
        speed: 10
      }, {
        progressStartValue: 0,
        progressEndValue: 70,
        speed: 10
      }
    ];

    let allCount = 0;
    let completedCount = 0;
    let uncompletedCount = 0;

    this.tasks.forEach((todo) => {
      allCount++;
      if (todo.status === "completed") {
        completedCount++;
      } else {
        uncompletedCount++;
      }
    })


    progressValueArray[0].progressEndValue = ((completedCount * 100) / allCount).toFixed(0);
    progressValueArray[1].progressEndValue = ((uncompletedCount * 100) / allCount).toFixed(0);
    progressValueArray[2].progressEndValue = ((uncompletedCount * 100) / allCount).toFixed(0);

    let progressCompletedInterval = setInterval(() => {
      if (isNaN(progressValueArray[0].progressEndValue)) {
        progressValueArray[0].progressEndValue = 0;
      }
      progressValueArray[0].progressStartValue++;

      progressCompletedValue.textContent = `${progressValueArray[0].progressEndValue}%`;

      progressCompleted.style.background = `conic-gradient(blue ${progressValueArray[0].progressStartValue * 3.6}deg, #ededed 0deg)`;

      if (progressValueArray[0].progressStartValue >= progressValueArray[0].progressEndValue) {
        clearInterval(progressCompletedInterval);
      }
    }, progressValueArray[0].speed);

    let progressInProgressInterval = setInterval(() => {
      if (isNaN(progressValueArray[1].progressEndValue)) {
        progressValueArray[1].progressEndValue = 0;
      }
      progressValueArray[1].progressStartValue++;

      progressInProgressValue.textContent = `${progressValueArray[1].progressEndValue}%`;

      progressInProgress.style.background = `conic-gradient(green ${progressValueArray[1].progressStartValue * 3.6}deg, #ededed 0deg)`;

      if (progressValueArray[1].progressStartValue >= progressValueArray[1].progressEndValue) {
        clearInterval(progressInProgressInterval);
      }
    }, progressValueArray[1].speed);

    let progressNotStartedInterval = setInterval(() => {
      if (isNaN(progressValueArray[2].progressEndValue)) {
        progressValueArray[2].progressEndValue = 0;
      }
      progressValueArray[2].progressStartValue++;

      progressUnCompletedValue.textContent = `${progressValueArray[2].progressEndValue}%`;

      progressUnCompleted.style.background = `conic-gradient(red ${progressValueArray[2].progressStartValue * 3.6}deg, #ededed 0deg)`;

      if (progressValueArray[2].progressStartValue >= progressValueArray[2].progressEndValue) {
        clearInterval(progressNotStartedInterval);
      }
    }, progressValueArray[2].speed);
  }


}





