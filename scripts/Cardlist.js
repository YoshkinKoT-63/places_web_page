class CardList {
  constructor(placesList, initialCards, createCard) {
    this.placesList = placesList;
    this.initialCards = initialCards;
    this.createCard = createCard;
  }

  addCard = (place) => {
    this.placesList.appendChild(this.createCard(place));
};
  
  render() {
    this.initialCards.forEach(place => {
      this.addCard(place);
    })
  };
}