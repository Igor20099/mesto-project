//Показать ошибку
export function showInputError(
  formElement,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

//Скрыть ошибку
export function hideInputError(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
}

//Проверка на невалидный ввод
export function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//Переключение состоянии кнопки
export function toggleButtonState(
  inputList,
  buttonElement,
  inactiveButtonClass
) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

//Проверка на валидность
export function isValid(
  formElement,
  inputElement,
  inputErrorClass,
  errorClass
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
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

//Установка слушателей событий на поля формы
export function setEventListeners(
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  const inputList = Array.from(formSelector.querySelectorAll(inputSelector));
  const buttonElement = formSelector.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formSelector, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  });
}

//Включение валидации
export function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(
      formElement,
      settings.inputSelector,
      settings.submitButtonSelector,
      settings.inactiveButtonClass,
      settings.inputErrorClass,
      settings.errorClass
    );
  });
}

//Очистить валидацию
export function clearValidation(formElement, settings) {
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
