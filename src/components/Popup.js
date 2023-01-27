export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open () {
      this._popup.classList.add("popup_opened");
  }

  close () {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_opened");
      this.close(openedPopup);
    }
  }

  setEventListeners(evt) {
    const popupCloseButton = this._popup.querySelector('.popup__close-button');
    popupCloseButton.addEventListener('click', () => this.close(this._popup));
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener('click', () => this._handleOverlayClose(evt));
  }

  _handleOverlayClose (evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }
}

// //popup edit profile
// export const popupEditProfile = document.querySelector(".popup_edit-profile");
// export const popupEditForm = popupEditProfile.querySelector(".popup__form");
// export const popupNameInput = popupEditProfile.querySelector(
//   ".popup__edit-input_type_name"
// );
// export const popupAboutInput = popupEditProfile.querySelector(
//   ".popup__edit-input_type_about"
// );
// export const popupEditProfileCloseButton = popupEditProfile.querySelector(
//   ".popup__close-button"
// );

// //popup add card
// export const popupAddCard = document.querySelector(".popup_add-card");
// export const popupAddCardCloseButton = popupAddCard.querySelector(
//   ".popup__close-button"
// );
// export const popupLinkImageInput = popupAddCard.querySelector(
//   ".popup__edit-input_type_link-image"
// );
// export const popupAddForm = popupAddCard.querySelector(".popup__form");
// export const popupAddNameInput = popupAddCard.querySelector(
//   ".popup__edit-input_type_name"
// );

// //popup fullsize image
// export const popupFullsizeImage = document.querySelector(
//   ".popup_fullsize-image"
// );
// export const popupImage = popupFullsizeImage.querySelector(".popup__image");
// export const popupImageTitle = popupFullsizeImage.querySelector(
//   ".popup__image-title"
// );
// export const popupFullSizeImageCloseButton = popupFullsizeImage.querySelector(
//   ".popup__close-button"
// );
// export const popupAddSaveButton = popupAddForm.querySelector(
//   ".popup__save-button"
// );
// export const popupEditSaveButton = popupEditForm.querySelector(
//   ".popup__save-button"
// );

// //popup Edit Avatar
// export const popupEditAvatar = document.querySelector(".popup_edit-avatar");
// export const popupEditAvatarCloseButton = popupEditAvatar.querySelector(
//   ".popup__close-button"
// );

// export const popupEditAvatarSaveButton = popupEditAvatar.querySelector(
//   ".popup__save-button"
// );
// export const popupAvatarLinkImage = popupEditAvatar.querySelector(
//   ".popup__edit-input_type_avatar"
// );

// //Закрытие popup на кнопку ESC
// export function closeByEscape(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_opened");
//     closePopup(openedPopup);
//   }
// }

// //функция открытия popup (###)
// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// //функция закрытия popup (###)
// export function openPopup(popup) {
//   popup.classList.add("popup_opened");
//   document.addEventListener("keydown", closeByEscape);
// }

// //функция закрытия popup (###)
// export function closePopup(popup) {
//   popup.classList.remove("popup_opened");
//   document.removeEventListener("keydown", closeByEscape);
// }


