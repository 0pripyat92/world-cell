const modalabrir = document.querySelector('[data-modal="abrir"]');
const containerModal = document.querySelector('[data-modal="container"]');
const modalFechar = document.querySelector('[data-modal="fechar"]');
const filtrosActive = document.querySelector('.filtrar');
const showfilter = document.querySelector('.showFilter');
const filtrosActiveid = document.getElementById('filtrar');

if (modalabrir && containerModal && filtrosActiveid) {
  function initmodal() {
    function togglemodal(e) {
      e.preventDefault();
      containerModal.classList.toggle('ativo');
      showfilter.classList.toggle('hidenFilter');
    }

    function clickforamodal(e) {
      if (e.target === this) {
        togglemodal(e);
      }
    }
    containerModal.addEventListener('click', clickforamodal);
    modalabrir.addEventListener('click', togglemodal);
	document.querySelector('.modaltxtFilter.girafa-explica').addEventListener('click', clickforamodal);
    modalFechar.addEventListener('click', clickforamodal);
  }
  initmodal();
}
