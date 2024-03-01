class ScrollCompare {
  constructor(observer, compare) {
    this.observer = document.querySelector(observer);
    this.compare = document.querySelectorAll(compare);
    this.checkDistance = this.debounce(this.checkDistance.bind(this), 50);
    this.widthChange = document.querySelectorAll('.stylus-table-new ');
    this.widthChanges = document.querySelectorAll('.container-super-table ');
  }

  itemcostumer() {
    const arraytesst = [...this.compare];
    let media = arraytesst.length;
    switch (media) {
      case (arraytesst.length = 3):
        this.compare.forEach((item) => {
          item.classList.add('tresitem');
        });
        this.widthChanges[0].style.flex = '2';
        this.widthChanges[1].style.flex = '1';
        this.widthChanges[2].style.flex = '1';
        break;

      case (arraytesst.length = 4):
        this.compare.forEach((item) => {
          item.classList.add('quatroitem');
        });
        this.widthChanges[0].style.flex = '2';
        this.widthChanges[1].style.flex = '1';
        this.widthChanges[2].style.flex = '1';
        this.widthChanges[3].style.flex = '1';
        break;

      default:
        this.compare.forEach((item) => {
          item.classList.add('doisitem');
        });
        this.widthChanges[0].style.flex = '2';
        this.widthChanges[1].style.flex = '1';
        break;
    }
  }
  debounce(callback, delay) {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, delay);
    };
  }
  getDistance() {
    const result = window.innerHeight * 0.9;
    const resultElement = this.observer.offsetTop;
    this.offSet = Math.floor(result - resultElement);

    return this.offsetElement, this.offSet;
  }

  checkDistance() {
    this.compare.forEach((item) => {
      if (window.pageYOffset > this.offSet) {
        item.classList.add('ativo');
        item.style.transition = '0.5s';
      } else {
        item.classList.remove('ativo');
      }
    });
  }

  init() {
    const widthClass = window.innerWidth;
    if (this.itemcostumer && this.compare && this.observer) {
      this.itemcostumer();
      if (widthClass > 1000) {
        this.getDistance();
        this.checkDistance();
        window.addEventListener('scroll', this.checkDistance);
      }
    }
  }
}

const scrollCompare = new ScrollCompare(
  '.titulo-compare',
  '.titulos-compare-tester',
);
scrollCompare.init();
