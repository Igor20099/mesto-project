export default class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }
  _showInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = settings.errorMessage;
    errorElement.classList.add(settings.errorClass);
  }

  _hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorClass);
    errorElement.textContent = "";
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(
    inputList,
    buttonElement,
    settings
  ) {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  }

  _isValid(
    formElement,
    inputElement,
    settings
  ) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }
  
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, inputElement, settings);
    }
  }

  _setEventListeners(
    settings
  ) {
    const inputList = Array.from(settings.formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = settings.formSelector.querySelector(settings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(settings.formSelector, inputElement, settings.inputErrorClass, settings.errorClass);
        toggleButtonState(inputList, buttonElement, settings.inactiveButtonClass);
      });
    });
  }

  enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      setEventListeners(
        formElement,
        settings
      );
    });
  }
  
  clearValidation(formElement, settings) {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector)
    );
    const errorMessages = Array.from(
      formElement.querySelectorAll(settings.errorMessage)
    );
    inputList.forEach((inputElement) => {
      if (inputElement.classList.contains(settings.inputErrorClass)) {
        inputElement.classList.remove(settings.inputErrorClass);
      }
    });
    errorMessages.forEach((errorMessage) => {
      if (errorMessage.classList.contains(settings.errorClass)) {
        errorMessage.classList.remove(settings.errorClass);
      }
    });
  }
  
}

