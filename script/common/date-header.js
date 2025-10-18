import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

const today = new dayjs();

const todayString = today.format("dddd");
const todayDate = today.format("D/M/YYYY");

document.querySelector('.header-date > span:first-child').innerText = todayString;
document.querySelector('.header-date > span:last-child').innerText = todayDate;