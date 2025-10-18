import { Task } from "../data/task-class.js";
import { getProfileDetail } from "./common/menu.js";
import '../script/common/date-header.js';

const task = new Task();
getProfileDetail();
task.generateAllTasks();
task.renderCalendar();
task.openNotification();
task.editTasks();
task.alertHelp();



document.querySelector('.js-close-box').addEventListener('click', () => {
  document.querySelector('.js-edit').style.display = "none";
})

document.querySelector('.js-add-task-btn').addEventListener('click', () => {
  document.querySelector('.js-add').style.display = "flex";
})

document.querySelector('.js-close-box-add').addEventListener('click', () => {
  document.querySelector('.js-add').style.display = "none";
})

task.addTaskAll();