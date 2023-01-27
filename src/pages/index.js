import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { settings, config } from "../utils/constants.js";

const api = new Api(config);
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__image"
);

Promise.all([api.getUserMe(), api.getInitialCards()])
  .then(([userMe, cards]) => {
    console.log(cards);
    userInfo.setUserId(userMe._id);
    userInfo.setUserInfo(userMe.name, userMe.about);
    userInfo.setUserAvatar(userMe.avatar);
    const cardList = new Section(
      {
        items: cards,
        renderer: (card) => {
          const cardElement = new Card(
            card,
            userInfo.getUserId(),
            ".elements",
            (id, likes) => {api.addLikeCard(id,likes)},
            (id, likes) => {api.deleteLikeCard(id,likes)},
          );
          cardList.addItem(cardElement.generate());
        },
      },
      ".elements"
    );
    cardList.rendererItems();
  })
  .catch((err) => {
    console.log(err);
  });

// function addLikeHandler(elementCard, card, profile) {
//   api
//     .addLikeCard(card._id)
//     .then((card) => {
//       likeCard(elementCard, card.likes, profile);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

function deleteLikeHandler(elementCard, card, profile) {
  api
    .deleteLikeCard(card._id)
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

//Функция обработки editForm
export function editFormSubmitHandler(evt, values) {
  evt.preventDefault();
  popupEditSaveButton.textContent = "Сохранение...";
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

// //Открытие popupEditProfile
// profileEditButton.addEventListener("click", () => {
//   clearValidation(popupEditForm, settings);
//   popupNameInput.value = profileName.textContent;
//   popupAboutInput.value = profileAbout.textContent;
//   popupEditSaveButton.disable = false;
//   popupEditSaveButton.classList.remove("popup__save-button_inactive");
//   openPopup(popupEditProfile);
// });

// //Закрытие popupEditProfile
// popupEditProfileCloseButton.addEventListener("click", () => {
//   closePopup(popupEditProfile);
// });

// //Слушатель событий для popupEditForm
// popupEditForm.addEventListener("submit", editFormSubmitHandler);

// //Открытие popupEditAvatar
// profileEditAvatarButton.addEventListener("click", () => {
//   openPopup(popupEditAvatar);
// });

// //Закрытие popupEditAvatar
// popupEditAvatarCloseButton.addEventListener("click", () => {
//   closePopup(popupEditAvatar);
// });

// //Слушатель событий для popupEditAvatar
// popupEditAvatar.addEventListener("submit", editAvatarSubmitHandler);

// //Открытие popupAddCard
// profileAddButton.addEventListener("click", () => {
//   popupAddSaveButton.disable = true;
//   popupAddSaveButton.classList.add("popup__save-button_inactive");
//   openPopup(popupAddCard);
// });

// //Закрытие popupAddCard
// popupAddCardCloseButton.addEventListener("click", () => {
//   closePopup(popupAddCard);
// });

// //Слушатель событий для popupAddForm
// popupAddForm.addEventListener("submit", addFormSubmitHandler);

// //Закрытие popupFullsizeImage
// popupFullSizeImageCloseButton.addEventListener("click", () => {
//   closePopup(popupFullsizeImage);
// });

//Закрытие popup по клику на оверлей
// document.addEventListener("click", (evt) => {
//   if (evt.target === popupEditProfile) {
//     closePopup(popupEditProfile);
//   } else if (evt.target === popupAddCard) {
//     closePopup(popupAddCard);
//   } else if (evt.target === popupFullsizeImage) {
//     closePopup(popupFullsizeImage);
//   } else if (evt.target === popupEditAvatar) {
//     closePopup(popupEditAvatar);
//   }
// });
