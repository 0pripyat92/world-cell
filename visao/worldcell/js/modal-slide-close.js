const selectModalCompare = document.querySelector('.modal-slide');
const events = ['touchstart', 'mousedown'];
const html = document.documentElement;
const verify = document.querySelector('.container-infos-table');
if (verify) {
  selectModalCompare.style.display = 'flex';
}
events.forEach((event) => {
  html.addEventListener(event, removeModal);
});
function removeModal() {
  // console.log('oi');
  selectModalCompare.style.display = 'none';
  events.forEach((event) => {
    html.removeEventListener(event, removeModal);
  });
}
