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
  deleteCard,
} from "./api";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
  errorMessage: ".popup__input-error",
};

Promise.all([getUserMe(), getInitialCards()])
  .then(([userMe, cards]) => {
    profile.id = userMe._id;
    profileName.textContent = userMe.name;
    profileAbout.textContent = userMe.about;
    profileAvatar.src = userMe.avatar;
    cards.forEach((card) => {
      const elementCard = renderCard(card, profile);
      elementContainer.append(elementCard);
    });
  })
  .catch((err) => {
    console.log(err);
  });

export function addLikeHandler(elementCard, card, profile) {
  addLikeCard(card._id)
    .then((card) => {
      likeCard(elementCard, card.likes, profile);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function deleteLikeHandler(elementCard, card, profile) {
  deleteLikeCard(card._id)
    .then((card) => {
      likeCard(elementCard, card.likes, profile);
    })
    .catch((err) => {
      console.log(err);
    });
}

 export function deleteCardHandler(element) {
  deleteCard(element.id)
    .then(() => element.remove())
    .catch((err) => {
      console.log(err);
    });
}

//?????????????? ?????????????????? editForm
export function editFormSubmitHandler(evt) {
  evt.preventDefault();
  popupEditSaveButton.textContent = "????????????????????...";
  console.log("ok");
  const nameValue = popupNameInput.value;
  const aboutValue = popupAboutInput.value;
  editProfileInfo(nameValue, aboutValue)
    .then(() => {
      profileName.textContent = nameValue;
      profileAbout.textContent = aboutValue;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditSaveButton.textContent = "??????????????????";
    });
  closePopup(popupEditProfile);
}

//?????????????? ?????????????????? EditAvatar
export function editAvatarSubmitHandler(evt) {
  evt.preventDefault();
  popupEditAvatarSaveButton.textContent = "????????????????????...";
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
      popupEditAvatarSaveButton.textContent = "??????????????????";
    });
}

//?????????????? ?????????????????? AddForm
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddSaveButton.textContent = "????????????????...";
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
      popupAddSaveButton.textContent = "??????????????";
    });
}

//???????????????? popupEditProfile
profileEditButton.addEventListener("click", () => {
  clearValidation(popupEditForm, settings);
  popupNameInput.value = profileName.textContent;
  popupAboutInput.value = profileAbout.textContent;
  popupEditSaveButton.disable = false;
  popupEditSaveButton.classList.remove("popup__save-button_inactive");
  openPopup(popupEditProfile);
});

//???????????????? popupEditProfile
popupEditProfileCloseButton.addEventListener("click", () => {
  closePopup(popupEditProfile);
});

//?????????????????? ?????????????? ?????? popupEditForm
popupEditForm.addEventListener("submit", editFormSubmitHandler);

//???????????????? popupEditAvatar
profileEditAvatarButton.addEventListener("click", () => {
  openPopup(popupEditAvatar);
});

//???????????????? popupEditAvatar
popupEditAvatarCloseButton.addEventListener("click", () => {
  closePopup(popupEditAvatar);
});

//?????????????????? ?????????????? ?????? popupEditAvatar
popupEditAvatar.addEventListener("submit", editAvatarSubmitHandler);

//???????????????? popupAddCard
profileAddButton.addEventListener("click", () => {
  popupAddSaveButton.disable = true;
  popupAddSaveButton.classList.add("popup__save-button_inactive");
  openPopup(popupAddCard);
});

//???????????????? popupAddCard
popupAddCardCloseButton.addEventListener("click", () => {
  closePopup(popupAddCard);
});

//?????????????????? ?????????????? ?????? popupAddForm
popupAddForm.addEventListener("submit", addFormSubmitHandler);

//???????????????? popupFullsizeImage
popupFullSizeImageCloseButton.addEventListener("click", () => {
  closePopup(popupFullsizeImage);
});

//???????????????? popup ???? ?????????? ???? ??????????????
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

// ?????????????????? ??????????????????
enableValidation(settings);
