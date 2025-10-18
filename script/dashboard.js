import { Task } from "../data/task-class.js";
import { getProfileDetail } from "./common/menu.js";
import './common/date-header.js';

const task = new Task();

document.addEventListener('DOMContentLoaded', () => {

  getProfileDetail();

  task.generateTasksByStatus();
  task.addTask();
  task.addEventListener(task);
  task.logoutSystem();
  task.renderCalendar();
  task.openNotification();
  task.getStatus();
  task.shareWeb();
  task.alertHelp();

  document.querySelector('.js-add-task-btn').addEventListener('click', () => {
    document.querySelector('.js-add').style.display = "flex";
  })

  document.querySelector('.js-close-box').addEventListener('click', () => {
    document.querySelector('.js-add').style.display = "none";
  })

  document.querySelector('.js-invite-btn').addEventListener('click', () => {
    document.querySelector('.js-invite-box').style.display = "flex";
  })

  document.querySelector('.js-close-invite').addEventListener('click', () => {
    document.querySelector('.js-invite-box').style.display = "none";
  })

  

})