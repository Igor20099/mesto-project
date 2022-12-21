import "../pages/index.css";
import { elementContainer, likeCard, renderCard } from "./card";

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
  popupFullSizeImageCloseButton,
  openPopup,
  closePopup,
  popupAddSaveButton,
  popupEditSaveButton,
  popupEditAvatar,
  popupAvatarLinkImage,
  popupEditAvatarCloseButton,
  popupEditAvatarSaveButton,
} from "./popup";

import {
  profile,
  profileName,
  profileAbout,
  profileEditButton,
  profileAddButton,
  profileEditAvatarButton,
  profileAvatar,
} from "./profile";

import {
  enableValidation,
  clearValidation,
  toggleButtonState,
} from "./validate";

import {
  editProfileInfo,
  addCard,
  getUserMe,
  getInitialCards,
  changeAvatar,
  addLikeCard,
  deleteLikeCard,
} from "./api";

Promise.all([getUserMe(), getInitialCards()])
  .then(([userMe, cards]) => {
    profile.id = userMe._id;
    profileName.textContent = userMe.name;
    profileAbout.textContent = userMe.about;
    profileAvatar.src = userMe.avatar;
    cards.forEach((card) => {
      const elementCard = renderCard(card, profile);
      const elementLikeButton = elementCard.querySelector(
        ".element__like-button"
      );
      elementLikeButton.addEventListener("click", () => {
        if (
          !elementLikeButton.classList.contains("element__like-button_active")
        ) {
          addLikeCard(card._id)
            .then((card) => {
              likeCard(elementCard, card.likes, profile);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          deleteLikeCard(card._id)
            .then((card) => {
              likeCard(elementCard, card.likes, profile);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
      elementContainer.append(elementCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

//Функция обработки editForm
export function editFormSubmitHandler(evt) {
  evt.preventDefault();
  popupEditSaveButton.textContent = "Сохранение...";
  const nameValue = popupNameInput.value;
  const aboutValue = popupAboutInput.value;
  profileName.textContent = nameValue;
  profileAbout.textContent = aboutValue;
  editProfileInfo(nameValue, aboutValue).finally(() => {
    popupEditSaveButton.textContent = "Сохранить";
  });

  closePopup(popupEditProfile);
}

//Функция обработки EditAvatar
export function editAvatarSubmitHandler(evt) {
  evt.preventDefault();
  popupEditAvatarSaveButton.textContent = "Сохранение...";
  const linkAvatar = popupAvatarLinkImage.value;
  changeAvatar(linkAvatar)
    .then((userMe) => {
      console.log(linkAvatar);
      profileAvatar.src = userMe.avatar;
      profileAvatar.alt = userMe.avatar;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatarSaveButton.textContent = "Сохранить";
    });
}

//Функция обработки AddForm
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddSaveButton.textContent = "Создание...";
  addCard(popupAddNameInput.value, popupLinkImageInput.value)
    .then((card) => {
      popupAddNameInput.value = "";
      popupLinkImageInput.value = "";
      elementContainer.prepend(renderCard(card, profile));
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupAddSaveButton.textContent = "Создать";
    });
}

//Открытие popupEditProfile
profileEditButton.addEventListener("click", () => {
  clearValidation(popupEditForm, {
    inputSelector: ".popup__input",
    errorMessage: ".popup__input-error",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_inactive",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__input-error_active",
  });
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  popupEditSaveButton.disable = false;
  popupEditSaveButton.classList.remove("popup__save-button_inactive");

  openPopup(popupEditProfile);
});

//Закрытие popupEditProfile
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//Слушатель событий для popupEditForm
popupEditForm.addEventListener("submit", editFormSubmitHandler);

//Открытие popupEditAvatar
profileEditAvatarButton.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});

//Закрытие popupEditAvatar
popupEditAvatarCloseButton.addEventListener("click", () => {
  closePopup(popupEditAvatar);
});

//Слушатель событий для popupEditAvatar
popupEditAvatar.addEventListener("submit", editAvatarSubmitHandler);

//Открытие popupAddCard
profileAddButton.addEventListener("click", () => {
  popupAddSaveButton.disable = true;
  popupAddSaveButton.classList.add("popup__save-button_inactive");
  openPopup(popupAddCard);
});

//Закрытие popupAddCard
popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//Слушатель событий для popupAddForm
popupAddForm.addEventListener("submit", addFormSubmitHandler);

//Закрытие popupFullsizeImage
popupFullSizeImageCloseButton.addEventListener("click", () => {
  closePopup(popupFullsizeImage);
});

//Закрытие popup по клику на оверлей
document.addEventListener("click", (evt) => {
  if (evt.target === popupEditProfile) {
    closePopup(popupEditProfile);
  } else if (evt.target === popupAddCard) {
    closePopup(popupAddCard);
  } else if (evt.target === popupFullsizeImage) {
    closePopup(popupFullsizeImage);
  } else if (evt.target === popupEditAvatar) {
    closePopup(popupEditAvatar);
  }
});

// Включение валидации
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
});
