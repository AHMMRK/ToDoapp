export let personal = JSON.parse(localStorage.getItem('personalData')) || [];

export function saveToStorage() {
  localStorage.setItem('personalData', JSON.stringify(personal));
}