export function getProfileDetail() {
  let personalDetail = JSON.parse(localStorage.getItem('personDetail'));

  document.querySelector('.js-name').innerText = personalDetail.firstName + personalDetail.lastName;
  document.querySelector('.js-email').innerText = personalDetail.email;
}