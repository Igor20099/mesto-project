export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseButton = this._popup.querySelector('.popup__close-button');
  }

  open () {
      this._popup.classList.add("popup_opened");
  }

  close () {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButton.addEventListener('click', () => this.close(this._popup));
    document.addEventListener("keydown", (evt) => this._handleEscClose(evt));
    this._popup.addEventListener('click', (evt) => this._handleOverlayClose(evt));
  }

  _handleOverlayClose (evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}


