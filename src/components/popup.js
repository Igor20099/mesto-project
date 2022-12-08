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
  profileAvatar,
} from "./profile";

import { editProfileInfo, addCard, changeAvatar } from "./api";

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
export const popupAddSaveButton = popupAddForm.querySelector(".popup__save-button");
export const popupEditSaveButton = popupEditForm.querySelector(".popup__save-button");

export const popupEditAvatar = document.querySelector('.popup_edit-avatar')
export const popupEditAvatarCloseButton = popupEditAvatar.querySelector(
  ".popup__close-button"
);

export const popupEditAvatarSaveButton =popupEditAvatar.querySelector(
  ".popup__save-button"
);
const popupAvatarLinkImage = popupEditAvatar.querySelector('.popup__edit-input_type_avatar')


//Закрытие popup на кнопку ESC
export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
   closePopup(openedPopup);
  }
}

//функция открытия popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEscape); 
}

//функция закрытия popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEscape); 
}

//Функция обработки editForm
export function editFormSubmitHandler(evt) {
  evt.preventDefault();
  popupEditSaveButton.textContent = 'Сохранение...'
  const nameValue = popupNameInput.value;
  const aboutValue = popupAboutInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;
  editProfileInfo(nameValue,aboutValue).finally(() => {
    popupEditSaveButton.textContent = 'Сохранить'
  })
 
  closePopup(popupEditProfile);
}


export function editAvatarSubmitHandler(evt) {
  evt.preventDefault();
  popupEditAvatarSaveButton.textContent = 'Сохранение...'
  const linkAvatar = popupAvatarLinkImage.value
  changeAvatar(linkAvatar).then(userMe => {
    console.log(linkAvatar)
    profileAvatar.src = userMe.avatar;
    profileAvatar.alt = userMe.avatar
  }).finally(() => {
    popupEditAvatarSaveButton.textContent = 'Сохранить'
  })
 
  closePopup(popupEditAvatar);
}

//Функция обработки AddForm
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddSaveButton.textContent = 'Создание...'
  const addNameValue = popupAddNameInput.value;
  const linkImageValue = popupLinkImageInput.value;
  const card = {};
  card.name = addNameValue;
  card.link = linkImageValue;
  elementContainer.prepend(renderCard(card));
  popupAddNameInput.value = "";
  popupLinkImageInput.value = "";
  addCard(addNameValue,linkImageValue).finally(() => {
    popupAddSaveButton.textContent = 'Создать'
  })
 
  closePopup(popupAddCard);
}


