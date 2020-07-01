class Popup {
  constructor(popup) {
    this.element = popup; //форма попап
    this.closePopupButton = this.element.querySelector('.popup__close');//найти кнопку закрытия окна
  };

//открытие окна
  open() {
    this.element.classList.add('popup_is-opened');
  };
  
//закрытие окна
  close() {
    this.element.classList.remove('popup_is-opened');
  };

//закрытие окна при нажатии Esc
  closePopupByEscapeButton = (event) => {
    if (event.code === 'Escape') {
      this.close();
    }
  };

  setEventListeners() {
    /**
     * Можно лучше:
     * this.closePopupButton.addEventListener('click', this.close);
     */
    this.closePopupButton.addEventListener('click', () => {this.close()});//закрытие по крестику
    window.addEventListener('keydown', this.closePopupByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  };
}
