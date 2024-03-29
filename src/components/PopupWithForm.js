import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, handleOpen = () => {}) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._handleOpen = handleOpen;
    this._inputList = this._form.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._handleSubmit(evt, this._getInputValues());
    });
  }

  open() {
    super.open();
    this._handleOpen();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
