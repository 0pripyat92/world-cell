class Atendimento {
  constructor(horarioFuncionamento, activeClass, after) {
    this.horarioFuncionamento = document.querySelector(horarioFuncionamento);
    this.activeClass = activeClass;
  }
  dataSetFuncionamento() {
    this.diaSemana = this.horarioFuncionamento.dataset.semana
      .split(',')
      .map(Number);
    this.horarioSemana = this.horarioFuncionamento.dataset.horario
      .split(',')
      .map(Number);
    // this.sabado = this.horarioFuncionamento.dataset.sabado
    //   .split(',')
    //   .map(Number);
  }

  dataDadosNow() {
    this.dateNow = new Date();
    this.dayNow = this.dateNow.getDay();
    this.hoursNow = this.dateNow.getUTCHours() - 3;
  }

  confirmWork() {
    const weekOpen = this.diaSemana.indexOf(this.dayNow) !== -1;
    const horarioDeFuncionamento =
      this.hoursNow >= this.horarioSemana[0] &&
      this.hoursNow < this.horarioSemana[1];

    return weekOpen && horarioDeFuncionamento;
  }
  // confirmSabado() {
  //   const weekOpenSabado = this.sabado.indexOf(this.dayNow) !== -1;
  //   const horarioDeFuncionamentoSabado =
  //     this.hoursNow >= this.horarioSemana[0] &&
  //     this.hoursNow < this.horarioSemana[1];

  //   return weekOpenSabado && horarioDeFuncionamentoSabado;
  // }

  activeOpen() {
    // if (this.confirmSabado()) {
    //   this.horarioFuncionamento.classList.add(this.activeClass);
    // }
    if (this.confirmWork()) {
      this.horarioFuncionamento.classList.add(this.activeClass);
    }
  }
  init() {
    if (this.horarioFuncionamento) {
      this.dataSetFuncionamento();
      this.dataDadosNow();
      this.activeOpen();
    }
  }
}
const horarioAtendimento = new Atendimento('[data-semana]', 'aberto');
horarioAtendimento.init();
