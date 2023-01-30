export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this._settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
    }
  }

  _isValid(inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleButtonState(
      inputList,
      buttonElement,
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(
          inputElement,
        );
        this._toggleButtonState(
          inputList,
          buttonElement,
        );
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  clearValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    const errorMessages = Array.from(
      this._formElement.querySelectorAll(this._settings.errorMessage)
    );
    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(this._settings.inputErrorClass)) {
        inputElement.classList.remove(this._settings.inputErrorClass);
      }
    });
    errorMessages.forEach((errorMessage) => {
      if (errorMessage.classList.contains(this._settings.errorClass)) {
        errorMessage.classList.remove(this._settings.errorClass);
      }
    });
  }
}
