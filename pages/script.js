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

//переменные
const placesList = document.querySelector('.places-list'); //контейнер с карточками
const addPlaceButton = document.querySelector('.user-info__button'); //кнопка "+" добавления карточки
const addPlacePopupButton = document.querySelector('.popup__button'); //кнопка "+" формы ввода
const popupForm = document.forms.new; //форма ввода
const popup = document.querySelector('.popup');
const closePopupForm = document.querySelector('.popup__close'); //значок закрытия формы ввода

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

//функция заполнения
function fillingPlaceList (places) {
  places.forEach (function(place) {
    createPlace(place.name, place.link);
  });
}

//функция проверки полей ввода названия и адреса
function inputHandler () {
  const placeName = popupForm.elements.name;
  const link = popupForm.elements.link;
  if (placeName.value.length === 0 || link.value.length === 0) {
    addPlacePopupButton.setAttribute('disabled', 'true');
  }
    else {
      addPlacePopupButton.removeAttribute('disabled');
    }
}

//функция закрытия формы ввода
function popupIsClosed() {
  popup.classList.remove('popup_is-opened');
  popupForm.reset();
  closePopupForm.removeEventListener('click', popupIsClosed); //снять обработчик закрытия формы ввода при нажатии на крестик
  document.removeEventListener('keydown', popupIsClosedByEscapeButton); //снять обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.removeEventListener('input', inputHandler); //снять обработчик заполнения полей
  popupForm.removeEventListener('submit', placeAddedByUser); //снять обработчик отправки формы
}

//закрытие формы ввода при нажатии Esc
function popupIsClosedByEscapeButton(event) {
  if (event.code == 'Escape') {
    popupIsClosed();
  }
}

//функция открытия формы ввода
function popupIsOpened() {
  const popup = document.querySelector('.popup');
  popup.classList.add('popup_is-opened');
  addPlacePopupButton.setAttribute('disabled', true); //кнопка ввода неактивна
  closePopupForm.addEventListener('click', popupIsClosed); //обработчик закрытия формы ввода при нажатии на крестик
  document.addEventListener('keydown', popupIsClosedByEscapeButton); //обработчик закрытия формы ввода при нажатии клавиши Esc
  popupForm.addEventListener('input', inputHandler); //обработчик заполнения полей
  popupForm.addEventListener('submit', placeAddedByUser); //обработчик отправки формы
}

//функция лайков
function placeLiked(event) {
  event.target.classList.toggle('place-card__like-icon_liked');
}

//заполняем карточками контейнер
fillingPlaceList(initialCards);

//обработчики событий
addPlaceButton.addEventListener('click', popupIsOpened);

placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__like-icon')) {
    placeLiked(event);
  } else if (event.target.classList.contains('place-card__delete-icon')) {
    deletePlace(event);
  }
})
