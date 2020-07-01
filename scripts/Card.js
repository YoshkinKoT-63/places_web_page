class Card {
  constructor(placeName, link, showCard) {
    this.placeName = placeName;
    this.link = link;
    this.showCard = showCard;
  }

//лайк
  like = () => {
    this.placeCardLikeIcon.classList.toggle('place-card__like-icon_liked');
  };

//удаление карточки
  remove = (event) => {
    event.stopPropagation();
    this.placeCardLikeIcon.removeEventListener('click', this.like);
    this.placeCardDeleteIcon.removeEventListener('click', this.remove);
    this.placeCardImage.removeEventListener('click', this.openCard);
    this.placeCard.remove();
  };

  openCard = () => {
    this.showCard(this.link);
  };
 
//создание карточки
  create = () => {
    //назначим переменные
    this.placeCard = document.createElement('div'); // карточка
    this.placeCardImage = document.createElement('div'); // фото
    this.placeCardDeleteIcon = document.createElement('button'); // кнопка удаления
    this.placeCardDescription = document.createElement('div'); // подпись
    this.placeCardName = document.createElement('h4'); //название
    this.placeCardLikeIcon = document.createElement('button'); // кнопка лайк

    //присвоим классы
    this.placeCard.classList.add('place-card');
    this.placeCardImage.classList.add('place-card__image');
    this.placeCardDeleteIcon.classList.add('place-card__delete-icon');
    this.placeCardDescription.classList.add('place-card__description');
    this.placeCardName.classList.add('place-card__name');
    this.placeCardLikeIcon.classList.add('place-card__like-icon');

    //собираем блок с фото
    this.placeCardImage.appendChild(this.placeCardDeleteIcon);

    //собираем блок с описанием
    this.placeCardDescription.appendChild(this.placeCardName);
    this.placeCardDescription.appendChild(this.placeCardLikeIcon);

    //собираем карточку из блоков фото и описание
    this.placeCard.appendChild(this.placeCardImage);
    this.placeCard.appendChild(this.placeCardDescription);

    //задаём название
      
    this.placeCard.querySelector('.place-card__name').textContent = this.placeName;
    //задаём фон блоку
    this.placeCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    //вешаем обработчики
    this.setEventListeners();

    //вернуть собранную карточку    
    return this.placeCard;
  };

//добавление карточки
//слушатели событий  
  setEventListeners = () => {
    this.placeCardLikeIcon.addEventListener('click', this.like);
    this.placeCardDeleteIcon.addEventListener('click', this.remove);
    this.placeCardImage.addEventListener('click', this.openCard);
  };
}
