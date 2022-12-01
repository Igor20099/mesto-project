import "../pages/index.css";
import {
  elementContainer,
  elementTemplate,
  elementlikeButton,
  likeCard,
  removeCard,
  renderCard,
} from "./card";
import { initialCards } from "./initialCards";
import {
  popupEditProfile,
  popupEditForm,
  popupNameInput,
  popupAboutInput,
  popupEditProfileCloseButton,
  popupAddCard,
  popupAddCardCloseButton,
  popupLinkImageInput,
  popupAddForm,
  popupAddNameInput,
  popupFullsizeImage,
  popupImage,
  popupImageTitle,
  popupFullSizeImageCloseButton,
  openPopup,
  closePopup,
  editFormSubmitHandler,
  addFormSubmitHandler,
} from "./popup";
import {
  profile,
  profileName,
  profileAbout,
  profileEditButton,
  profileAddButton,
} from "./profile";

import { enableValidation, toggleButtonState,isValid ,clearValidation} from "./validate";

//отображения карточек с массива initialCards
initialCards.forEach((item) => {
  elementContainer.prepend(renderCard(item));
});

//Открытие popupEditProfile
profileEditButton.addEventListener("click", () => {
  clearValidation(popupEditForm)
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  const popupSaveButton = popupEditForm.querySelector('.popup__save-button')
  if (popupNameInput.value === '' && popupAboutInput.value === ''){
    popupSaveButton.classList.add('popup__save-button_inactive')
    popupSaveButton.disabled = true;
   }
   else {
     popupSaveButton.classList.remove('popup__save-button_inactive')
    popupSaveButton.disabled = false;
   }
  openPopup(popupEditProfile);
});

//Закрытие popupEditProfile
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//Закрытие popup по нажатию ан кнопку "Esc"
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    closePopup(popupEditProfile);
    closePopup(popupAddCard);
    closePopup(popupFullsizeImage);
  }
});

//Закрытие popup по клику на оверлей
document.addEventListener("click", (evt) => {
  if (evt.target === popupEditProfile) {
    closePopup(popupEditProfile);
  } else if (evt.target === popupAddCard) {
    closePopup(popupAddCard);
  } else if (evt.target === popupFullsizeImage) {
    closePopup(popupFullsizeImage);
  }
});

//Слушатель событий для popupEditForm
popupEditForm.addEventListener("submit", editFormSubmitHandler);

//Открытие popupAddCard
profileAddButton.addEventListener("click", () => {
  const popupSaveButton = popupAddForm.querySelector('.popup__save-button')
  if (popupAddNameInput.value === '' && popupLinkImageInput.value === ''){
   popupSaveButton.classList.add('popup__save-button_inactive')
   popupSaveButton.disabled = true;
  }
  else {
    popupSaveButton.classList.remove('popup__save-button_inactive')
   popupSaveButton.disabled = false;
  }
 
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

//Слушатель событий для popupAddForm
popupAddForm.addEventListener("submit", addFormSubmitHandler);

// Включение валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
