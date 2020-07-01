class AddPlacePopup extends Popup {
  constructor(popup, openButton, popupForm, cardList, addPlaceFormValidator) {
    super(popup);
    this.openButton = openButton;//кнопка открытия окна
    this.popupForm = popupForm; // перезаписывается родительский
    this.cardList = cardList;
    this.popupButton = this.popupForm.querySelector('.button');
    this.addPlaceFormValidator = addPlaceFormValidator;
  }

  resetForm = () => {
    this.popupForm.reset();
    /**
     * Можно лучше:
     * Убрать передачу параметров в функцию, так как они не используются
     */
    this.addPlaceFormValidator.setButtonInactive(this.popupButton);
    this.addPlaceFormValidator.resetValidationErrors(this.popupForm);
  };

  submit = (event) => {
    event.preventDefault();
    this.place = {};
    this.place.name = this.popupForm.elements.name.value;
    this.place.link = this.popupForm.elements.link.value;
    this.cardList.addCard(this.place);
    super.close();
  };

  open() {
    this.resetForm();
    super.open();
  };

  setEventListeners = () => {
    super.setEventListeners();
    /**
     * Можно лучше:
     * this.openButton.addEventListener('click', this.open);
     */
    this.openButton.addEventListener('click', () => {this.open()});//открытие по заданной кнопке
    this.popupForm.addEventListener('submit', this.submit);
  };
}