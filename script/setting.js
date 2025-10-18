import { getProfileDetail } from './common/menu.js';
import { personal, saveToStorage } from '../data/personal.js';
import './common/date-header.js';
import { Task } from '../data/task-class.js';

const task = new Task();
getProfileDetail();

task.renderCalendar();
task.openNotification();

const openBtn = document.querySelector('.js-account-information');
const usernameInput = document.querySelector('.js-username');
const passwordInput = document.querySelector('.js-password');
const buttonConfirm = document.querySelector('.js-confirm-btn');
openBtn.style.display = "none";



document.querySelector('.js-account-preview').addEventListener('click', () => {
  if (openBtn.style.display === "none") {
    document.querySelector('.js-account-information').style.display = "flex";
  } else {
    document.querySelector('.js-account-information').style.display = "none";
  }
})

document.querySelector('.js-name-box').innerText = document.querySelector('.js-name').innerText;
document.querySelector('.js-email-box').innerText = document.querySelector('.js-email').innerText;

let personalDetail = JSON.parse(localStorage.getItem('personDetail'));

usernameInput.value = personalDetail.userName;
passwordInput.value = personalDetail.password;


document.querySelector('.js-editable-btn').addEventListener('click', () => {
  if (usernameInput.disabled === true) {
    usernameInput.disabled = false;
    usernameInput.style.border = "1px solid green";
    passwordInput.disabled = false;
    passwordInput.style.border = "1px solid green";
    buttonConfirm.style.display = "flex";
  } else {
    usernameInput.value = userNameValue;
    passwordInput.value = passwordValue;
    usernameInput.disabled = true;
    usernameInput.style.border = "none";
    passwordInput.disabled = true;
    passwordInput.style.border = "none";
    buttonConfirm.style.display = "none";
  }
})


document.querySelector('.js-confirm-btn').addEventListener('click', () => {
  const newDetails = {
    id: personalDetail.id,
    firstName: personalDetail.firstName,
    lastName: personalDetail.lastName,
    userName: usernameInput.value,
    email: personalDetail.email,
    password: passwordInput.value
  }

  localStorage.setItem('personDetail', JSON.stringify(newDetails));
  setChangesOnPersonalLocals();

  usernameInput.disabled = true;
  passwordInput.disabled = true;
  buttonConfirm.style.display = "none";
})

function setChangesOnPersonalLocals() {
  let personalDetail = JSON.parse(localStorage.getItem('personDetail'));

  personal.forEach((personData, index) => {
    if (personalDetail.id === personData.id) {
      personal[index] = personalDetail;
      saveToStorage();
    }
  })
}

task.alertHelp();


