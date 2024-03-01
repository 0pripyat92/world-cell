const hourSelect = document.querySelector('.hour');
const minuteSelect = document.querySelector('.minute');
const secondSelect = document.querySelector('.second');
const getDateBase = document.querySelector('.countdown');
const countDown = () => {
  const dayPromotion = getDateBase.getAttribute('data-fim');
  const mes = new Date().getMonth() + 1;
  const dias = new Date().getDate() + 1;
  const ano = new Date().getFullYear();
  // const promocao = new Date(`${mes} ${dias}, ${ano}`);
  const promocao = new Date(dayPromotion);
  const agora = new Date().getTime();
  const diferencaTempo = promocao - agora;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textoDias = Math.floor(diferencaTempo / day);
  const textoHoras = Math.floor((diferencaTempo % day) / hour);
  const textoMinutos = Math.floor((diferencaTempo % hour) / minute);
  const textoSegundos = Math.floor((diferencaTempo % minute) / second);

  document.querySelector('.day').innerText = textoDias;

  if (textoHoras < 10) {
    hourSelect.innerText = '0' + textoHoras;
  } else {
    hourSelect.innerText = textoHoras;
  }
  if (textoMinutos < 10) {
    minuteSelect.innerText = '0' + textoMinutos;
  } else {
    minuteSelect.innerText = textoMinutos;
  }
  if (textoSegundos < 10) {
    secondSelect.innerText = '0' + textoSegundos;
  } else {
    secondSelect.innerText = textoSegundos;
  }
};
if (hourSelect && minuteSelect && secondSelect) setInterval(countDown, 1000);
