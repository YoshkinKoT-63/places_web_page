class ImagePopup extends Popup {

  showImage = (url) => {
    this.element.querySelector('.popup__image').setAttribute('src', url);
    super.open();
  };
}