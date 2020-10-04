class FormValidator {
  constructor(form, errorMessages){
    this.form = form;
    this.errorMessages = errorMessages;
    this.button = this.form.querySelector('.popup__button');
  }

  // валидация поля ввода
  isValidate = (input) => {
    input.setCustomValidity("");
      if (input.validity.valueMissing) {
        input.setCustomValidity(this.errorMessages.empty);
        return false
      }
      if (input.validity.tooShort || input.validity.tooLong) {
        input.setCustomValidity(this.errorMessages.wrongLength);
        return false
      }
      if (input.validity.typeMismatch && input.type === 'url') {
        input.setCustomValidity(this.errorMessages.wrongUrl);
        return false
      }
      return input.checkValidity();
  };

  //метод добавления/удаления ошибки с инпута
  checkInputValidity = (input) => {
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = this.isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  };

  //включение кнопки ввода формы
  setButtonActive = () => {
    this.button.removeAttribute('disabled');
    this.button.classList.add('popup__button_active');
  };

  //отключение кнопки ввода формы
  setButtonInactive = () => {
    this.button.setAttribute('disabled', 'disabled');
    this.button.classList.remove('popup__button_active');
  };

//метод сброса ошибок валидации
  resetValidationErrors = () => {
    this.errors = this.form.querySelectorAll('.popup__error');
    this.errors.forEach((err) => err.textContent = '');
};

// слушатель события на input
  inputHandler = (evt) => {
    const [...inputs] = this.form.querySelectorAll('.popup__input');
    this.checkInputValidity(evt.target);
    if (inputs.every(this.isValidate)) {
      this.setButtonActive(this.button);
    } else {
      this.setButtonInactive(this.button);
      }
  };

  //добавление слушателей
  setEventListeners = () => {
    this.form.addEventListener('input', this.inputHandler, true);
  };
}