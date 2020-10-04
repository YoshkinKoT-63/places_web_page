class UserInfoPopup extends Popup {
  constructor(popup, openButton, popupForm, userInfo, editProfileFormValidator) {
    super(popup);
    this.openButton = openButton;
    this.popupForm = popupForm;
    this.popupButton = this.popupForm.querySelector('.button');
    this.userInfo = userInfo;
    this.editProfileFormValidator = editProfileFormValidator;
  }

  resetForm = () => {
    /**
     * Можно лучше:
     * Убрать передачу параметров в функцию, так как они не используются
     */
    this.editProfileFormValidator.setButtonActive(this.popupButton);
    this.editProfileFormValidator.resetValidationErrors(this.popupForm);
    this.popupForm.elements.infoName.value = this.userInfo.userName.textContent;
    this.popupForm.elements.infoAbout.value = this.userInfo.userAbout.textContent;
  };

  submit = (event) => {
    event.preventDefault();
    this.userInfo.setUserInfo(this.popupForm.elements.infoName.value, this.popupForm.elements.infoAbout.value);
    this.userInfo.upDateUserInfo();
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