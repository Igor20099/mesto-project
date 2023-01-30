import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { settings, config } from "../utils/constants.js";

let cardList;
const api = new Api(config);
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__image"
);
const popupWithAddForm = new PopupWithForm(".popup_add-card", (evt, values) => {
  evt.preventDefault();
  // popupAddSaveButton.textContent = "Создание...";
  api
    .addCard(values["card-name"], values["card-link-image"])
    .then((card) => {
      const cardElement = new Card(
        card,
        userInfo.getUserId(),
        "#element",
        (id, likes) => {
          api.addLikeCard(id, likes);
        },
        (id, likes) => {
          api.deleteLikeCard(id, likes);
        },
        () => {
          popupWithImage.open(card.name, card.link);
        },
        (cardElement) => {
          api
            .deleteCard(card._id)
            .then(() => cardElement.remove())
            .catch((err) => {
              console.log(err);
            });
        }
      );
      values["card-name"] = "";
      values["card-link-image"] = "";
      cardList.addItem(cardElement.generate(), false);
      popupWithAddForm.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      // popupAddSaveButton.textContent = "Создать";
    });
});
const popupWithEditForm = new PopupWithForm(
  ".popup_edit-profile",
  (evt, values) => {
    evt.preventDefault();
    // popupEditSaveButton.textContent = "Сохранение...";
    const nameValue = values["edit-name"];
    const aboutValue = values["edit-about"];
    api
      .editProfileInfo(nameValue, aboutValue)
      .then(() => {
        userInfo.setUserInfo(nameValue, aboutValue);
        popupWithEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // popupEditSaveButton.textContent = "Сохранить";
      });
  }
);
const popupWithEditAvatorForm = new PopupWithForm(
  ".popup_edit-avatar",
  (evt, values) => {
    evt.preventDefault();
    // popupEditAvatarSaveButton.textContent = "Сохранение...";
    const linkAvatar = values["edit-avatar-link"];
    api
      .changeAvatar(linkAvatar)
      .then((userMe) => {
        userInfo.setUserAvatar(userMe.avatar);
        popupWithEditAvatorForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // popupEditAvatarSaveButton.textContent = "Сохранить";
      });
  }
);
const popupWithImage = new PopupWithImage(".popup_fullsize-image");

const profile = document.querySelector(".profile");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-image-button"
);

Promise.all([api.getUserMe(), api.getInitialCards()])
  .then(([userMe, cards]) => {
    console.log(cards);
    userInfo.setUserId(userMe._id);
    userInfo.setUserInfo(userMe.name, userMe.about);
    userInfo.setUserAvatar(userMe.avatar);
    cardList = new Section(
      {
        items: cards,
        renderer: (card) => {
          console.log(card);
          const cardElement = new Card(
            card,
            userInfo.getUserId(),
            "#element",
            (id, likes) => {
              api.addLikeCard(id, likes);
            },
            (id, likes) => {
              api.deleteLikeCard(id, likes);
            },
            () => {
              popupWithImage.open(card.name, card.link);
            },
            (cardElement) => {
              api
                .deleteCard(card._id)
                .then(() => cardElement.remove())
                .catch((err) => {
                  console.log(err);
                });
            }
          );
          cardList.addItem(cardElement.generate(), true);
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

// function deleteLikeHandler(elementCard, card, profile) {
//   api.deleteLikeCard(card._id)
//     .then((card) => {
//       likeCard(elementCard, card.likes, profile);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

//Функция обработки AddForm
function addFormSubmitHandler(evt, values) {
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
  // clearValidation(popupEditForm, settings);
  // popupNameInput.value = profileName.textContent;
  // popupAboutInput.value = profileAbout.textContent;
  // popupEditSaveButton.disable = false;
  // popupEditSaveButton.classList.remove("popup__save-button_inactive");
  popupWithEditForm.open();
});

//Открытие popupEditAvatar
profileEditAvatarButton.addEventListener("click", () => {
  popupWithEditAvatorForm.open();
});

//Открытие popupAddCard
profileAddButton.addEventListener("click", () => {
  // popupAddSaveButton.disable = true;
  // popupAddSaveButton.classList.add("popup__save-button_inactive");
  popupWithAddForm.open();
});
