import "../pages/index.css";
import {
  elementContainer,
  elementTemplate,
  elementlikeButton,
  likeCard,
  removeCard,
  renderCard,
} from "./card";
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
  popupAddSaveButton,
  popupEditSaveButton,
  closeByEscape,
} from "./popup";
import {
  profile,
  profileId,
  profileName,
  profileAbout,
  profileAvatar,
  profileEditButton,
  profileAddButton,
} from "./profile";

import {
  enableValidation,
  toggleButtonState,
  isValid,
  clearValidation,
} from "./validate";

import {getUserMe, getInitialCards} from "./api"

Promise.all([getUserMe(),getInitialCards()]).then(([userMe, cards]) => cards.forEach(card => {
  console.log(card)
  elementContainer.prepend(renderCard(card,userMe));
}))


//Открытие popupEditProfile
profileEditButton.addEventListener("click", () => {
  clearValidation(popupEditForm);
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  if (popupNameInput.value === "" && popupAboutInput.value === "") {
    popupEditSaveButton.classList.add("popup__save-button_inactive");
    popupEditSaveButton.disabled = true;
  } else {
    popupEditSaveButton.classList.remove("popup__save-button_inactive");
    popupEditSaveButton.disabled = false;
  }
  openPopup(popupEditProfile);
});

//Закрытие popupEditProfile
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
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
  if (popupAddNameInput.value === "" && popupLinkImageInput.value === "" || !popupLinkImageInput.validity.valid || !popupAddNameInput.validity.valid) {
    popupAddSaveButton.classList.add("popup__save-button_inactive");
    popupAddSaveButton.disabled = true;
  } else {
    popupAddSaveButton.classList.remove("popup__save-button_inactive");
    popupAddSaveButton.disabled = false;
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
