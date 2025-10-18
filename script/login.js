import { personal } from '../data/personal.js';

const username = document.querySelector('.js-userInput');
const password = document.querySelector('.js-userPass');

let personalDetail = localStorage.getItem('personDetail') || '';

function searchPerson() {

  personal.forEach((personalData) => {
    if (username.value !== "" && password.value !== "") {
      if (username.value === personalData.userName) {
        document.querySelector('.username').style.border = '1px solid black';
        if (password.value === personalData.password) {
          document.querySelector('.password').style.border = '1px solid black';
          alert("Login Successfully");
          personalDetail = personalData;
          username.value = '';
          password.value = '';
          localStorage.setItem('personDetail', JSON.stringify(personalData));
          setTimeout(() => {
            window.location.href = "../dashboard.html";
          },2000);
        } else {
          document.querySelector('.password').style.border = '1px solid red';
        }
      } else {
        document.querySelector('.username').style.border = '1px solid red';
      }
    } 
  })
}

document.querySelector('#js-login-btn').addEventListener('click', () => {
  searchPerson();
});