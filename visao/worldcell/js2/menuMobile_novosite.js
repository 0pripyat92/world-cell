const menuMobile = document.querySelectorAll('.menu-style--menu');
const activeMenu = document.getElementById('menu-side');
const activeMascara = document.getElementById('mascara_modal2');
const loginMenu = document.getElementById('login-mobile');
const modalLogin = document.getElementById('modal-login');
const modalDialog = document.querySelector('.modal-dialog');
const closeX = document.querySelector('.close-menu--login');
const modalCadastro = document.querySelector('.login-sub');
const closeModalCadastro = document.querySelector('.login-sub .close');

const queroCadastrar = document.querySelector(
  '.quero-cadastrar-ou-sem-cadastro a',
);

loginMenu.addEventListener('click', handleClickLogin);
function handleClickLogin() {
  console.log(loginMenu.classList.contains('deslogado'));
  if (loginMenu.classList.contains('deslogado')) {
    modalLogin.classList.add('in');
    modalLogin.style.display = 'block';
    activeMenu.style.display = 'none';

    outsideClickLogin(modalCadastro, closeModalCadastro, queroCadastrar, () => {
      modalLogin.classList.remove('in');
      modalLogin.style.display = 'none';
      activeMascara.style.display = 'none';
    });
  }
}

function outsideClickLogin(
  element,
  closeModalCadastro,
  queroCadastrar,
  callback,
) {
  const html = document.documentElement;
  const outside = 'data-outside';

  if (!element.hasAttribute(outside)) {
    setTimeout(() => {
      html.addEventListener('click', handleOutsideClick);
    });
    element.setAttribute(outside, '');
  }

  function handleOutsideClick(event) {
    if (
      !element.contains(event.target) ||
      closeModalCadastro.contains(event.target) ||
      queroCadastrar.contains(event.target)
    ) {
      element.removeAttribute(outside);
      html.removeEventListener('click', handleOutsideClick);
      callback();
    }
  }
}

menuMobile.forEach((element) => {
  element.addEventListener('click', handleClick);
});

function handleClick(event) {
  event.preventDefault();
  activeMenu.style.display = 'block';
  activeMascara.style.display = 'block';

  outsideClick(activeMenu, closeX, () => {
    activeMenu.style.display = 'none';
  });
}

function outsideClick(element, closeX, callback) {
  const html = document.documentElement;
  const outside = 'data-outside';

  if (!element.hasAttribute(outside)) {
    setTimeout(() => {
      html.addEventListener('click', handleOutsideClick);
    });
    element.setAttribute(outside, '');
  }

  function handleOutsideClick(event) {
    if (closeX.contains(event.target) || !element.contains(event.target)) {
      element.removeAttribute(outside);
      html.removeEventListener('click', handleOutsideClick);
      activeMascara.style.display = 'none';

      callback();
    }
  }
}
