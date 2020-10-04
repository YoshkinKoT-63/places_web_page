'use strict';
//-------------------------------------------------------------------------------------------------------
//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const popupAddPlace = document.querySelector('.popup_type_add-place'); // всплывающее окно добавления карточки
const popupEditProfile = document.querySelector('.popup_type_edit-info'); // всплывающее окно редактирования профиля
const popupImage = document.querySelector('.popup_type_image'); //всплывающее окно с изображением
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const editInfoButton = document.querySelector('.user-info__edit-button'); //кнопка "Edit"
const userName = document.querySelector('.user-info__name');//имя пользователя
const userAbout = document.querySelector('.user-info__job');//род деятельности пользователя
const addPlacePopupButton = document.querySelector('.popup__button_add-place'); //кнопка "+" формы ввода
const popupForm = document.forms.new;//форма ввода новой карточки
const formProfile = document.forms.profile;//форма редактирования профиля

//-------------------------------------------------------------------------------------------------------
//Объекты
const userInfo = new UserInfo(userName, userAbout);
const editProfileFormValidator = new FormValidator(formProfile, errorMessages);
const addPlaceFormValidator = new FormValidator(popupForm, errorMessages);
const cardList = new CardList(placesList, initialCards, createCard);
const addPlacePopup = new AddPlacePopup (popupAddPlace, addPlaceButton, popupForm, cardList, addPlaceFormValidator);
const editProfilePopup = new UserInfoPopup(popupEditProfile, editInfoButton, formProfile, userInfo, editProfileFormValidator);
const imagePopupClass = new ImagePopup(popupImage);

//--------------------------------------------------------------------------------------------------------
//Функции

// добавление карты
function createCard(place) {
  const newCard = new Card(place.name, place.link, showCard);
  return newCard.create();
} // лишняя ;

function showCard(url) {
  imagePopupClass.showImage(url);
} // лишняя ;

//--------------------------------------------------------------------------------------------------------
//Обработчики событий
addPlacePopup.setEventListeners();
editProfilePopup.setEventListeners();
imagePopupClass.setEventListeners();
editProfileFormValidator.setEventListeners();
addPlaceFormValidator.setEventListeners();

//--------------------------------------------------------------------------------------------------------
//вызов функций

//заполнение контейнера карточками
cardList.render();

/**
 * Отлично, помимио критических замечаний были исправлены и замечания с пометкой "Можно лучше".
 * Работа принята. Желаю успехов в дальнейшем обучении!
 */