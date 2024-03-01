const buttonDados = document.querySelector('.editarButton');
const inputDados = document.querySelectorAll('.inputDados');
const buttonCancelEdit = document.querySelector('.buttonCancelEdit');

if (inputDados && buttonDados && buttonCancelEdit) {
  buttonDados.addEventListener('click', editDados);

  function editDados() {
    inputDados.forEach((element) => {
      element.removeAttribute('disabled');
    });
    if (!inputDados[0].hasAttribute('disabled')) {
      inputDados[0].focus();
    }
    buttonCancelEdit.style.visibility = 'visible';
  }

  buttonCancelEdit.addEventListener('click', cancelDados);
  function cancelDados() {
    inputDados.forEach((element) => {
      console.log(!element.hasAttribute('disabled'));
      if (!element.hasAttribute('disabled')) {
        element.setAttribute('disabled', '');
      }
    });
    buttonCancelEdit.style.visibility = 'hidden';
  }
}
