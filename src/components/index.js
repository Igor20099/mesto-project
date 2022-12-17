import "../pages/index.css";
import { elementContainer, renderCard } from "./card";

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
  popupEditAvatarCloseButton,
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

import { enableValidation, clearValidation } from "./validate";

import { editProfileInfo, addCard, getUserMe, getInitialCards } from "./api";

//Получаем свои данные
getUserMe().then(userMe => {
  profile.id = userMe._id;
  profileName.textContent = userMe.name;
  profileAbout.textContent = userMe.about;
  profileAvatar.src = userMe.avatar
})

//Инициализируем карточки с сервера
getInitialCards().then(( cards) => {
  cards.forEach((card) => {
    elementContainer.append(renderCard(card, profile));
  });
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
    })
    .finally(() => {
      popupEditAvatarSaveButton.textContent = "Сохранить";
    });

  closePopup(popupEditAvatar);
}

//Функция обработки AddForm
export function addFormSubmitHandler(evt) {
  evt.preventDefault();
  popupAddSaveButton.textContent = "Создание...";
  addCard(popupAddNameInput.value,  popupLinkImageInput.value)
    .then((card) => {
    popupAddNameInput.value = "";
    popupLinkImageInput.value = "";
      elementContainer.prepend(renderCard(card, profile))
    })
    .finally(() => {
      popupAddSaveButton.textContent = "Создать";
      closePopup(popupAddCard);
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
  if (
    (popupAddNameInput.value === "" && popupLinkImageInput.value === "") ||
    !popupLinkImageInput.validity.valid ||
    !popupAddNameInput.validity.valid
  ) {
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
