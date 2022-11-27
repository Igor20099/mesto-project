//Начальные карточки для загрузки
import "../pages/index.css";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

//profile
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileAbout = profile.querySelector(".profile__about");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileAddButton = profile.querySelector(".profile__add-button");

//popup edit profile
const popupEditProfile = document.querySelector(".popup_edit-profile");
const popupEditForm = popupEditProfile.querySelector(".popup__edit-info");
const popupNameInput = popupEditProfile.querySelector(
  ".popup__edit-input_type_name"
);
const popupAboutInput = popupEditProfile.querySelector(
  ".popup__edit-input_type_about"
);
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);

//popup add card
const popupAddCard = document.querySelector(".popup_add-card");
const popupAddCardCloseButton = popupAddCard.querySelector(
  ".popup__close-button"
);
const popupLinkImageInput = popupAddCard.querySelector(
  ".popup__edit-input_type_link-image"
);
const popupAddForm = popupAddCard.querySelector(".popup__edit-info");
const popupAddNameInput = popupAddCard.querySelector(
  ".popup__edit-input_type_name"
);

//popup fullsize image
const popupFullsizeImage = document.querySelector(".popup_fullsize-image");
const popupImage = popupFullsizeImage.querySelector(".popup__image");
const popupImageTitle = popupFullsizeImage.querySelector(".popup__image-title");
const popupFullSizeImageCloseButton = popupFullsizeImage.querySelector(
  ".popup__close-button"
);

//cards
const elementContainer = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content;
const elementlikeButton = document.querySelector(".element__like-button");

//функция открытия popup
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//функция закрытия popup
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//функция лайка карточки
function likeCard(element) {
  const elementLikeButton = element.querySelector(".element__like-button");
  elementLikeButton.addEventListener("click", () => {
    elementLikeButton.classList.toggle("element__like-button_active");
  });
}

//функция удаление карточки
function removeCard(element) {
  const elementRemoveButton = element.querySelector(".element__remove-button");
  elementRemoveButton.addEventListener("click", () => {
    element.remove();
  });
}

//функция отображения карточки
function renderCard(item) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.name;
  element.querySelector(".element__image").addEventListener("click", () => {
    popupImage.src = element.querySelector(".element__image").src;
    popupImage.alt = element.querySelector(".element__image").alt;
    popupImageTitle.textContent = element.querySelector(".element__image").alt;
    openPopup(popupFullsizeImage);
  });
  element.querySelector(".element__title").textContent = item.name;
  likeCard(element);
  removeCard(element);
  return element;
}

//отображения карточек с массива initialCards
initialCards.forEach((item) => {
  elementContainer.prepend(renderCard(item));
});

//Открытие popupEditProfile
profileEditButton.addEventListener("click", () => {
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  openPopup(popupEditProfile);
});

//Закрытие popupEditProfile
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//Функция обработки editForm
function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const nameValue = popupNameInput.value;
  const aboutValue = popupAboutInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;
  closePopup(popupEditProfile);
}

//Слушатель событий для popupEditForm
popupEditForm.addEventListener("submit", editFormSubmitHandler);

//Открытие popupAddCard
profileAddButton.addEventListener("click", () => {
  openPopup(popupAddCard);
});

//Закрытие popupAddCard
popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//Закрытие popupFullsizeImage
popupFullSizeImageCloseButton.addEventListener("click", () => {
  closePopup(popupFullsizeImage);
});

//Функция обработки AddForm
function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const addNameValue = popupAddNameInput.value;
  const linkImageValue = popupLinkImageInput.value;
  const card = {};
  card.name = addNameValue;
  card.link = linkImageValue;
  elementContainer.prepend(renderCard(card));
  popupAddNameInput.value = "";
  popupLinkImageInput.value = "";
  enableValidation(popupAddForm)
  closePopup(popupAddCard);
}

//Слушатель событий для popupAddForm
popupAddForm.addEventListener("submit", addFormSubmitHandler);

//Валидация

const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим элемент ошибки внутри самой функции
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
  // Находим элемент ошибки
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  // Остальной код такой же
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__input-error_active");
  errorElement.textContent = "";
};

const hasInvalidInput = (inputList) => {
  // проходим по этому массиву методом some
  return inputList.some((inputElement) => {
    // Если поле не валидно, колбэк вернёт true
    // Обход массива прекратится и вся функция
    // hasInvalidInput вернёт true

    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  // Если есть хотя бы один невалидный инпут
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.disabled = true;
    buttonElement.classList.add("popup__save-button_inactive");
  } else {
    // иначе сделай кнопку активной
    buttonElement.disabled = false;
    buttonElement.classList.remove("popup__save-button_inactive");
  }
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  // Находим все поля внутри формы,
  // сделаем из них массив методом Array.from
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));

  const buttonElement = formElement.querySelector(".popup__save-button");
  toggleButtonState(inputList, buttonElement);
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    // каждому полю добавим обработчик события input
    inputElement.addEventListener("input", () => {
      // Внутри колбэка вызовем isValid,
      // передав ей форму и проверяемый элемент
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formElement) => {
  setEventListeners(formElement);
};

// Вызовем функцию
enableValidation(popupEditForm);
enableValidation(popupAddForm);

document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupEditProfile);
    closePopup(popupAddCard);
    closePopup(popupFullsizeImage);
  }
});

document.addEventListener("click", (evt) => {
  if (evt.target === popupEditProfile) {
    closePopup(popupEditProfile);
  } else if (evt.target === popupAddCard) {
    closePopup(popupAddCard);
  } else if (evt.target === popupFullsizeImage) {
    closePopup(popupFullsizeImage);
  }
});
