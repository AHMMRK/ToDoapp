import { personal, saveToStorage } from '../data/personal.js';

const firstname = document.querySelector('.js-firstname-input');
const lastname = document.querySelector('.js-lastname-input');
const username = document.querySelector('.js-username-input');
const email = document.querySelector('.js-email-input');
const password = document.querySelector('.js-password-input');
const passwordCheck = document.querySelector('.js-passwordCheck-input');
const checkbox = document.querySelector('.js-remember-check');
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%#*?&]{8,}$/;

function checkEmpty() {
  let hasError = false;

  if (firstname.value !== '' || lastname.value !== '' || username.value !== '' || email.value !== '' || password.value !== '' || passwordCheck.value !== '') {
    if (firstname.value.length > 15) {
      console.log("Your first name is too long");
      hasError = true;
      document.querySelector('.js-firstname').style.border = '1px solid red';
    } if (lastname.value.length > 15) {
      console.log("Your last name is too long");
      hasError = true;
      document.querySelector('.js-lastname').style.border = '1px solid red';
    } if (username.value.includes(' ') || username.value.length < 8 || username.value.includes('@') || username.value.includes('-')) {
      console.log("Your username is wrong or already taken");
      hasError = true;
      document.querySelector('.js-username').style.border = '1px solid red';
    } if (!email.value.includes('@') || !email.value.includes('.com') && (!email.value.includes('gmail') || !email.value.includes('yahoo'))) {
      console.log("Your email isnt supported.");
      hasError = true;
      document.querySelector('.js-email').style.border = '1px solid red';
    } if (password.value.length < 8 || passwordRegex.test(password.value)) {
      console.log("Please use one character from A-Z a-z 1-9 in your password");
      hasError = true;
      document.querySelector('.js-password').style.border = '1px solid red';
    } if (passwordCheck.value !== password.value) {
      console.log("PasswordCheck isnt similar to password");
      hasError = true;
      document.querySelector('.js-passwordCheck').style.border = '1px solid red';
    } if (!checkbox.checked) {
      console.log("please check the checkbox and accept my privacy.");
      hasError = true;
      document.querySelector('.rem > span').style.color = 'red';
      document.querySelector('.rem > input').style.color = 'red';
    }

    if (!hasError) {
      const isUserExist = personal.some(user => user.username === username.value || user.email === email.value);

      if (isUserExist) {
        alert("❌ This username or email is already registered.");
        document.querySelector('.js-username').style.border = '1px solid red';
        document.querySelector('.js-email').style.border = '1px solid red';
        hasError = true;
        return;
      }

      const newUser = {
        id: Date.now(),
        firstName: firstname.value,
        lastName: lastname.value,
        userName: username.value,
        email: email.value,
        password: password.value
      };

      personal.push(newUser);
      saveToStorage();
      alert("✅ Registration successful!");

      firstname.value = '';
      lastname.value = '';
      username.value = '';
      email.value = '';
      password.value = '';
      passwordCheck.value = '';
      checkbox.checked = false;

      document.querySelector('.js-firstname').style.border = '1px solid black';
      document.querySelector('.js-lastname').style.border = '1px solid black';
      document.querySelector('.js-username').style.border = '1px solid black';
      document.querySelector('.js-email').style.border = '1px solid black';
      document.querySelector('.js-password').style.border = '1px solid black';
      document.querySelector('.js-passwordCheck').style.border = '1px solid black';
      setTimeout(() => {
        window.location = "../login.html";
      }, 1000)
    }

  } else {
    console.log('Please fill the form to registriation...');
    document.querySelector('.js-firstname').style.border = '1px solid black';
    document.querySelector('.js-lastname').style.border = '1px solid black';
    document.querySelector('.js-username').style.border = '1px solid black';
    document.querySelector('.js-email').style.border = '1px solid black';
    document.querySelector('.js-password').style.border = '1px solid black';
    document.querySelector('.js-passwordCheck').style.border = '1px solid black';
  }
}

document.querySelector('#register-button').addEventListener('click', () => {
  checkEmpty();
})