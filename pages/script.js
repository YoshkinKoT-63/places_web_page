const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
  {
    name: 'Нургуш',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
  },
  {
    name: 'Тулиновка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
  },
  {
    name: 'Остров Желтухина',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
  },
  {
    name: 'Владивосток',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
   }
];

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
  wrongPattern: 'Введите данные в верном формате',  
}

//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const addPlacePopupButton = document.querySelector('.popup__button-add-place'); //кнопка "+" формы ввода
const editProfilePopupButton = document.querySelector('.popup__button-edit-profile'); //кнопка "сохранить" формы ввода
const editInfoButton = document.querySelector('.user-info__edit-button'); //кнопка "Edit" 
const userName = document.querySelector('.user-info__name');//имя пользователя
const userAbout = document.querySelector('.user-info__job');//род деятельности пользователя
let popupForm; //форма ввода
let closePopupForm; //значок закрытия модального окна
let popup;//модальное окно

const formProfile = document.forms.profile;


//функция проверки поля на валидность
function isValidate(input) {
  
  input.setCustomValidity(""); //устанавливаем свойсво validity.customError в false
  console.log(input);
  console.log(input.validity);
  console.log(input.validity.valueMissing);
  console.log(input.validity.tooShort);
  console.log(input.validity.typeMismatch);
  console.log(input.validity.rangeOverflow);
  

  // если на инпуте есть атрибут required, поле validity.valueMissing будет true / false (заполнено)
  if (input.validity.valueMissing) {
    // текст ошибки записываем в inputElem.validationMessage с помощью input.setCustomValidity()
    input.setCustomValidity(errorMessages.empty);
    return false
  }  

  // если на инпуте есть атрибут minlength, поле validity.tooShort будет true / false (достигнута мин. длина)
  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  } 


  // если на инпуте есть атрибут type, поле validity.typeMismatch будет true / false (сопадение типа)
  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  } 

  if (input.validity.rangeOverflow) {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }

  return input.checkValidity();
}



  /**Функция добавления/удаления ошибки с инпута, возвращает true если поле валидно, false в противном случае*/
  function isFieldValid(input) { 
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    console.log(errorElem);
    const valid = isValidate(input); // устанавливаем инпуту кастомные ошибки, если они есть.
    errorElem.textContent = input.validationMessage;
    return valid;
  }



/**Функция проверки формы на валидность, возвращает true если форма валидна   */
function isFormValid(form) { //validateForm
  const inputs = [...form.elements];
  
  let valid = true;
  
  inputs.forEach((input) => {
    if (input.type !== 'submit' && input.type !== 'button') {
      if (!isFieldValid(input)) valid = false;
    }
  });
  
  return valid;
}


  /**Функция слушатесь события на input */
  function handlerInputForm(evt){

    const submit = evt.currentTarget.querySelector('.button');
    
    const [...inputs] = evt.currentTarget.elements; // превращаем итератор(итерируемый объект) в массив
    isFieldValid(evt.target); // проверяем поле на валидность и выводим ошибку если не валидно.
    

    // if (inputs.every(isValidate)) { // если каждый инпут формы вернул true, то включаем кнопку в противном случае выключаем
    //   // console.log('Кнопка активирована');
    //   setSubmitButtonState(submit, true);
    // } else {
    //   setSubmitButtonState(submit, false);
    //   // console.log('Кнопка деактивирована');
    // }

    //покажу вначале без функции handlerInputForm, а инлайново внутри обработчика покажу 

    // if (isFieldValid(name) && isFieldValid(link)) {
    //   console.log('Кнопка активирована');
    //   setSubmitButtonState(submit, true);
    // } else {
    //   console.log('Кнопка деактивирована');
    //   setSubmitButtonState(submit, false);
    // }   

  }


  formProfile.addEventListener('input', handlerInputForm, true);












//функция добавления карточки
function createPlace(placeName, link) {
  
  //назначим переменные
  const placeCard = document.createElement('div'); // карточка
  const placeCardImage = document.createElement('div'); // фото
  const placeCardDeleteIcon = document.createElement('button'); // кнопка удаления
  const placeCardDescription = document.createElement('div'); // подпись
  const placeCardName = document.createElement('h4'); //название
  const placeCardLikeIcon = document.createElement('button'); // кнопка лайк
  
  //присвоим классы
  placeCard.classList.add('place-card');
  placeCardImage.classList.add('place-card__image');
  placeCardDeleteIcon.classList.add('place-card__delete-icon');
  placeCardDescription.classList.add('place-card__description');
  placeCardName.classList.add('place-card__name');
  placeCardLikeIcon.classList.add('place-card__like-icon');
  
  //задаём фон блоку
  placeCardImage.setAttribute('style', `background-image: url(${link})`);
  
  //задаём название
  placeCardName.textContent = placeName;

  //собираем блок с фото
  placeCardImage.appendChild(placeCardDeleteIcon);

  //собираем блок с описанием
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(placeCardLikeIcon);
  
  //собираем карточку из блоков фото и описание
  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);
  
  //добавляем карточку в контейнер
  placesList.appendChild(placeCard);
}

//функция удаления карточки
function deletePlace(event){
    const place = event.target.closest('.place-card');
    place.parentNode.removeChild(place);
}

//функция добавления карточки пользователем
function placeAddedByUser(event) {
  event.preventDefault();
  const placeName = popupForm.elements.name.value;
  const link = popupForm.elements.link.value;
  createPlace(placeName, link);
  popupIsClosed();
}

//функция изменения имени и рода деятельности пользователя
function changeProfileInfo(event) {
  event.preventDefault();
  userName.textContent = formProfile.elements.infoName.value;
  userAbout.textContent = formProfile.elements.infoAbout.value;
  popupEditProfilesClosed();
}

//функция заполнения
function fillingPlaceList (places) {
  places.forEach (function(place) {
    createPlace(place.name, place.link);
  });
}

//включение кнопки ввода формы
function popupButtonActive(popupButton) {
  popupButton.setAttribute('disabled', 'disabled');
  popupButton.classList.add('popup__button_inactive');
  popupButton.classList.remove('popup__button_active');
}

//отключение кнопки ввода формы
function popupButtonInactive(popupButton) {
  popupButton.removeAttribute('disabled');
  popupButton.classList.add('popup__button_active');
  popupButton.classList.remove('popup__button_inactive');
}

//функция проверки полей ввода названия и адреса
function inputHandlerAddPlace() {
  const placeName = popupForm.elements.name;
  const link = popupForm.elements.link;
  if (placeName.value.length === 0 || link.value.length === 0) {
    popupButtonActive(addPlacePopupButton);
  }
    else {
      popupButtonInactive(addPlacePopupButton);
    }
}

//функция активации/деактивации кнопки отправки формы имени и рода деятельности
function inputHandlerEditProfile() {
  const infoName = formProfile.elements.infoName;
  const infoAbout = formProfile.elements.infoAbout;
  if (infoName.value.length === 0 || infoAbout.value.length === 0) {
    popupButtonActive(editProfilePopupButton);
  }
    else {
      popupButtonInactive(editProfilePopupButton);
    }

    const inputs = Array.from(formProfile.elements);
    
}

//закрытие формы ввода при нажатии Esc
function popupIsClosedByEscapeButton(event) {
  if (event.code == 'Escape') {
    escapePopup = popup.classList.value;
    if (escapePopup.includes('popup_type_editInfo')) {
      popupEditProfilesClosed();
    } else if (escapePopup.includes('popup_type_add-place')){
        popupAddPlaceIsClosed();
      } else if (escapePopup.includes('popup_type_image')) {
        popupImageisClosed();
        }
  }
}

// закрытие окна формы ввода "добавить место"
function popupAddPlaceIsClosed() {
  popupForm.closest('.popup').classList.remove('popup_is-opened');
  popupForm.reset();
  closePopupForm.removeEventListener('click', popupAddPlaceIsClosed); //снять обработчик закрытия формы ввода при нажатии на крестик
  document.removeEventListener('keydown', popupIsClosedByEscapeButton); //снять обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.removeEventListener('input', inputHandlerAddPlace); //снять обработчик заполнения полей
  popupForm.removeEventListener('submit', placeAddedByUser); //снять обработчик отправки формы
}

// закрытие окна формы ввода редактирования профиля
function popupEditProfilesClosed() {
  formProfile.closest('.popup').classList.remove('popup_is-opened');
  formProfile.reset();
  closePopupForm.removeEventListener('click', popupEditProfilesClosed); //снять обработчик закрытия формы ввода при нажатии на крестик
  document.removeEventListener('keydown', popupIsClosedByEscapeButton); //снять обработчик закрытия формы ввода при нажатии клавиши Esc
  formProfile.removeEventListener('input', inputHandlerEditProfile); //снять обработчик заполнения полей
  formProfile.removeEventListener('submit', placeAddedByUser); //снять обработчик отправки формы
}

//Закрытие окна с изображением
function popupImageisClosed() {
  popup.classList.remove('popup_is-opened');
  closePopupForm.removeEventListener('click', popupImageisClosed); //снять обработчик закрытия окна изображения при нажатии на крестик
  document.removeEventListener('keydown', popupIsClosedByEscapeButton); //снять обработчик закрытия окна изображения при нажатии клавиши Esc
}

//функция открытия формы ввода "добавить место"
function popupAddPlaceIsOpened() {
  popup = document.querySelector('.popup_type_add-place');
  popup.classList.add('popup_is-opened');
  closePopupForm = popup.querySelector('.popup__close');
  popupForm = document.forms.new;
  addPlacePopupButton.classList.add('popup__button_inactive');
  addPlacePopupButton.setAttribute('disabled', 'disabled'); //кнопка ввода неактивна
  closePopupForm.addEventListener('click', popupAddPlaceIsClosed); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', popupIsClosedByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.addEventListener('input', inputHandlerAddPlace); //обработчик заполнения полей
  popupForm.addEventListener('submit', placeAddedByUser); //обработчик отправки формы
}

//функция открытия формы ввода "редактировать профиль"
function popupEditInfoIsOpened() {
  popup = document.querySelector('.popup_type_editInfo');
  let inputUserName = popup.querySelector('.popup__input_type_info-name');
  let inputUserAbout = popup.querySelector('.popup__input_type_info-about');
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
  popup.classList.add('popup_is-opened');
  closePopupForm = popup.querySelector('.popup__close'); //значок закрытия формы ввода
  closePopupForm.addEventListener('click', popupEditProfilesClosed); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', popupIsClosedByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  formProfile.addEventListener('input', inputHandlerEditProfile); //обработчик заполнения полей
  formProfile.addEventListener('submit', changeProfileInfo); //обработчик отправки формы
}

//функция лайков
function placeLiked(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
}

//функция открытия изображения
function popupImageisOpened(event) {
  popup = document.querySelector('.popup_type_image'); //окно с изображением
  const placeImage = event.target.style['background-image'].replace(/(url\(|\)|")/g, ''); //достаём url
  closePopupForm = popup.querySelector('.popup__close');
  popup.querySelector('.popup__image').setAttribute('src', placeImage);
  popup.classList.add('popup_is-opened');
  closePopupForm.addEventListener('click', popupImageisClosed); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', popupIsClosedByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
}

//заполняем карточками контейнер
fillingPlaceList(initialCards);

//обработчики событий
addPlaceButton.addEventListener('click', popupAddPlaceIsOpened);

editInfoButton.addEventListener('click', popupEditInfoIsOpened);

placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
    placeLiked(event);
  } else if (event.target.classList.contains('place-card__delete-icon')) {
    deletePlace(event);
  } else if (event.target.classList.contains('place-card__image')) {
    popupImageisOpened(event);
  }
})
