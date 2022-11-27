import {
  elementContainer,
  elementTemplate,
  elementlikeButton,
  likeCard,
  removeCard,
  renderCard,
} from "./card";

import {
  profile,
  profileName,
  profileAbout,
  profileEditButton,
  profileAddButton,
} from "./profile";

import { enableValidation } from "./validate";

//popup edit profile
export const popupEditProfile = document.querySelector(".popup_edit-profile");
export const popupEditForm = popupEditProfile.querySelector(".popup__form");
export const popupNameInput = popupEditProfile.querySelector(
  ".popup__edit-input_type_name"
);
export const popupAboutInput = popupEditProfile.querySelector(
  ".popup__edit-input_type_about"
);
export const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);

//popup add card
export const popupAddCard = document.querySelector(".popup_add-card");
export const popupAddCardCloseButton = popupAddCard.querySelector(
  ".popup__close-button"
);
export const popupLinkImageInput = popupAddCard.querySelector(
  ".popup__edit-input_type_link-image"
);
export const popupAddForm = popupAddCard.querySelector(".popup__form");
export const popupAddNameInput = popupAddCard.querySelector(
  ".popup__edit-input_type_name"
);

//popup fullsize image
export const popupFullsizeImage = document.querySelector(
  ".popup_fullsize-image"
);
export const popupImage = popupFullsizeImage.querySelector(".popup__image");
export const popupImageTitle = popupFullsizeImage.querySelector(
  ".popup__image-title"
);
export const popupFullSizeImageCloseButton = popupFullsizeImage.querySelector(
  ".popup__close-button"
);

//функция открытия popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

//Функция обработки editForm
export function editFormSubmitHandler(evt) {
  evt.preventDefault();
  const nameValue = popupNameInput.value;
  const aboutValue = popupAboutInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;
  closePopup(popupEditProfile);
}

//Функция обработки AddForm
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const addNameValue = popupAddNameInput.value;
  const linkImageValue = popupLinkImageInput.value;
  const card = {};
  card.name = addNameValue;
  card.link = linkImageValue;
  elementContainer.prepend(renderCard(card));
  popupAddNameInput.value = "";
  popupLinkImageInput.value = "";
  enableValidation(popupAddForm);
  closePopup(popupAddCard);
}
