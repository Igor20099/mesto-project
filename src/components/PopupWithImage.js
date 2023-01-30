import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image')
        this._imageTitle = this._popup.querySelector('.popup__image-title')
        this.setEventListeners()
    }

    open (imageTitle, imageLink) {
        super.open();
        this._image.src = imageLink;
        this._image.alt = imageTitle;
        this._imageTitle.textContent = imageTitle;
    }
}