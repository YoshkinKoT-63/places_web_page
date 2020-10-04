'use strict';

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
}

//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const addPlacePopupButton = document.querySelector('.popup__button_add-place'); //кнопка "+" формы ввода
const editInfoButton = document.querySelector('.user-info__edit-button'); //кнопка "Edit"
const userName = document.querySelector('.user-info__name');//имя пользователя
const userAbout = document.querySelector('.user-info__job');//род деятельности пользователя
let closePopupForm; //значок закрытия окна
let popup;//всплывающее окно
const popupForm = document.forms.new;//форма ввода новой карточки
const formProfile = document.forms.profile;//форма редактирования профиля


//функция проверки поля на валидность
function isValidate(input) {
  input.setCustomValidity("");
  if (input.validity.valueMissing) {
    input.setCustomValidity(errorMessages.empty);
    return false
  }
  if (input.validity.tooShort || input.validity.tooLong) {
    input.setCustomValidity(errorMessages.wrongLength);
    return false
  }
  if (input.validity.typeMismatch && input.type === 'url') {
    input.setCustomValidity(errorMessages.wrongUrl);
    return false
  }
  return input.checkValidity();
}

  //Функция добавления/удаления ошибки с инпута
  function isFieldValid(input) {
    const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
    const valid = isValidate(input);
    errorElem.textContent = input.validationMessage;
    return valid;
  }

//включение кнопки ввода формы
function setButtonActive(popupButton) {
  popupButton.removeAttribute('disabled');
  popupButton.classList.add('popup__button_active');
  popupButton.classList.remove('popup__button_inactive');
}

//отключение кнопки ввода формы
function setButtonInactive(popupButton) {
  popupButton.setAttribute('disabled', 'disabled');
  popupButton.classList.add('popup__button_inactive');
  popupButton.classList.remove('popup__button_active');
}


  //Функция слушатель события на input
  function inputHandler(evt){
    const button = evt.currentTarget.querySelector('.button');
    const [...inputs] = evt.currentTarget.elements;
    isFieldValid(evt.target);
    if (inputs.every(isValidate)) {
      setButtonActive(button);
    } else {
      setButtonInactive(button);
      }
  }


//функция добавления карточки
function createPlace() {

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

  //собираем блок с фото
  placeCardImage.appendChild(placeCardDeleteIcon);

  //собираем блок с описанием
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(placeCardLikeIcon);

  //собираем карточку из блоков фото и описание
  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);

  return placeCard;
}

function renderPlace(placeName, link) {
  //создаём карточку
  const newPlace = createPlace();
  //задаём название
  newPlace.querySelector('.place-card__name').textContent = placeName;
  //задаём фон блоку
  newPlace.querySelector('.place-card__image').setAttribute('style', `background-image: url(${link})`);
  placesList.appendChild(newPlace);
}


//функция удаления карточки
function deletePlace(event){
    const place = event.target.closest('.place-card');
    place.parentNode.removeChild(place);
}

//функция сброса ошибок валидации
function resetValidationErrors(form) {
  const errors = form.querySelectorAll('.popup__error');
  errors.forEach((err) => err.textContent = '');//сброс ошибок валидации
}

// закрытие окна формы ввода "добавить место"
function closePopupAddPlace() {
  popupForm.closest('.popup').classList.remove('popup_is-opened');
  popupForm.reset();
  resetValidationErrors(popupForm);//сброс ошибок валидации
  closePopupForm.removeEventListener('click', closePopupAddPlace); //снять обработчик закрытия формы ввода при нажатии на крестик
  document.removeEventListener('keydown', closePopupByEscapeButton); //снять обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.removeEventListener('submit', addUserPlace); //снять обработчик отправки формы
  popupForm.removeEventListener('input', inputHandler, true);//снять обработчик валидации полей формы
}

// закрытие окна формы ввода редактирования профиля
function closePopupEditProfile() {
  formProfile.closest('.popup').classList.remove('popup_is-opened');
  formProfile.reset();
  resetValidationErrors(formProfile);//сброс ошибок валидации
  const button = formProfile.querySelector('.button');
  setButtonActive(button);
  closePopupForm.removeEventListener('click', closePopupEditProfile); //снять обработчик закрытия формы ввода при нажатии на крестик
  document.removeEventListener('keydown', closePopupByEscapeButton); //снять обработчик закрытия формы ввода при нажатии клавиши Esc
  formProfile.removeEventListener('submit', addUserPlace); //снять обработчик отправки формы
  formProfile.removeEventListener('input', inputHandler, true); //снять обработчик валидации полей
}

//Закрытие окна с изображением
function closePopupImage() {
  popup.classList.remove('popup_is-opened');
  closePopupForm.removeEventListener('click', closePopupImage); //снять обработчик закрытия окна изображения при нажатии на крестик
  document.removeEventListener('keydown', closePopupByEscapeButton); //снять обработчик закрытия окна изображения при нажатии клавиши Esc
}

//функция добавления карточки пользователем
function addUserPlace(event) {

  event.preventDefault();
  const placeName = popupForm.elements.name.value;
  const link = popupForm.elements.link.value;
  renderPlace(placeName, link);
  closePopupAddPlace();
}


//функция изменения имени и рода деятельности пользователя
function changeProfileInfo(event) {
  event.preventDefault();
  userName.textContent = formProfile.elements.infoName.value;
  userAbout.textContent = formProfile.elements.infoAbout.value;
  closePopupEditProfile();
}

//функция заполнения
function fillPlaceList (places) {
  places.forEach (function(place) {
    renderPlace(place.name, place.link);
  });
}

//закрытие формы ввода при нажатии Esc
function closePopupByEscapeButton(event) {
  if (event.code === 'Escape') {
    const escapePopup = popup.classList.value;
    if (escapePopup.includes('popup_type_edit-info')) {
      closePopupEditProfile();
    } else if (escapePopup.includes('popup_type_add-place')){
        closePopupAddPlace();
      } else if (escapePopup.includes('popup_type_image')) {
        closePopupImage();
        }
  }
}

//функция открытия формы ввода "добавить место"
function openPopupAddPlace() {
  popup = document.querySelector('.popup_type_add-place');
  popup.classList.add('popup_is-opened');
  closePopupForm = popup.querySelector('.popup__close');
  addPlacePopupButton.classList.add('popup__button_inactive');
  addPlacePopupButton.setAttribute('disabled', 'disabled'); //кнопка ввода неактивна
  closePopupForm.addEventListener('click', closePopupAddPlace); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', closePopupByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.addEventListener('submit', addUserPlace); //обработчик отправки формы
  popupForm.addEventListener('input', inputHandler, true);
}

//функция открытия формы ввода "редактировать профиль"
function openPopupEditInfo() {
  popup = document.querySelector('.popup_type_edit-info');
  const inputUserName = popup.querySelector('.popup__input_type_info-name');
  const inputUserAbout = popup.querySelector('.popup__input_type_info-about');
  inputUserName.value = userName.textContent;
  inputUserAbout.value = userAbout.textContent;
  popup.classList.add('popup_is-opened');
  closePopupForm = popup.querySelector('.popup__close'); //значок закрытия формы ввода
  closePopupForm.addEventListener('click', closePopupEditProfile); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', closePopupByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  formProfile.addEventListener('submit', changeProfileInfo); //обработчик отправки формы
  formProfile.addEventListener('input', inputHandler, true); //обработчик валидации полей
}

//функция лайков
function likePlace(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
}

//функция открытия изображения
function openPopupImage(event) {
  popup = document.querySelector('.popup_type_image'); //окно с изображением
  const placeImage = event.target.style['background-image'].slice(5, -2); //достаём url
  closePopupForm = popup.querySelector('.popup__close');
  popup.querySelector('.popup__image').setAttribute('src', placeImage);
  popup.classList.add('popup_is-opened');
  closePopupForm.addEventListener('click', closePopupImage); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', closePopupByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
}

function handleImageCard(event) {
  if (event.target.classList.contains('place-card__like-icon')) {
    likePlace(event);
  } else if (event.target.classList.contains('place-card__delete-icon')) {
    deletePlace(event);
  } else if (event.target.classList.contains('place-card__image')) {
    openPopupImage(event);
  }
}

//заполняем карточками контейнер
fillPlaceList(initialCards);

//обработчики событий
addPlaceButton.addEventListener('click', openPopupAddPlace);

editInfoButton.addEventListener('click', openPopupEditInfo);

placesList.addEventListener('click', handleImageCard);
