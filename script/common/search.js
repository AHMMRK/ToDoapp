import { Task } from "../../data/task-class.js";

document.addEventListener('DOMContentLoaded', () => {
  const task = new Task();
  const input = document.querySelector('#search-input');
  const searchBox = document.querySelector('.js-search-box');

  input.addEventListener('input', () => {
    searchBox.style.display = "flex";
    searchBox.style.transition = "ease-in 1s";
    const inputType = input.value.toLowerCase().trim();
    let html = '';

    task.tasks.forEach((todo) => {
      if (todo.title.toLowerCase().includes(inputType)) {
        html += `
          <span class="js-todo-search">${todo.title}</span>
        `;
      } else {
        return "";
      }
    })

    document.querySelector('.js-search-box').innerHTML = html;
  })

  input.addEventListener('blur', () => {
    document.querySelector('.js-search-box').style.display = "none";
  })
})