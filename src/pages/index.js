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
const editForm = document.forms["edit-info"];
const popupEditSaveButton = editForm.querySelector(".popup__save-button");
const editFormValidation = new FormValidator(settings, editForm);

const addForm = document.forms["add-card"];
const popupAddSaveButton = addForm.querySelector(".popup__save-button");
const addFormValidation = new FormValidator(settings, addForm);

const editAvatarForm = document.forms["avatar-form"];
const popupEditAvatarSaveButton = editAvatarForm.querySelector(
  ".popup__save-button"
);
const editAvatarFormValidation = new FormValidator(settings, editAvatarForm);
const nameInput = editForm.querySelector("#edit-name-input");
const aboutInput = editForm.querySelector("#edit-about-input");

const popupWithAddForm = new PopupWithForm(".popup_add-card", (evt, values) => {
  evt.preventDefault();
  popupAddSaveButton.textContent = "Создание...";
  api
    .addCard(values["card-name"], values["card-link-image"])
    .then((card) => {
      const cardElement = new Card(
        card,
        userInfo.getUserId(),
        "#element",
        () => {
          api.addLikeCard(card._id).catch((err) => {
            console.log(err);
          });
        },
        () => {
          api.deleteLikeCard(card._id).catch((err) => {
            console.log(err);
          });
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
      popupAddSaveButton.textContent = "Создать";
    });
});

const popupWithEditForm = new PopupWithForm(
  ".popup_edit-profile",
  (evt, values) => {
    evt.preventDefault();
    popupEditSaveButton.textContent = "Сохранение...";
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
        popupEditSaveButton.textContent = "Сохранить";
      });
  },
  () => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.name;
    aboutInput.value = info.about;
  }
);

const popupWithEditAvatorForm = new PopupWithForm(
  ".popup_edit-avatar",
  (evt, values) => {
    evt.preventDefault();
    popupEditAvatarSaveButton.textContent = "Сохранение...";
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
        popupEditAvatarSaveButton.textContent = "Сохранить";
      });
  }
);

const popupWithImage = new PopupWithImage(".popup_fullsize-image");
popupWithImage.setEventListeners();

const profile = document.querySelector(".profile");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-image-button"
);

popupWithAddForm.setEventListeners();
popupWithEditForm.setEventListeners();
popupWithEditAvatorForm.setEventListeners();

editFormValidation.enableValidation();
addFormValidation.enableValidation();
editAvatarFormValidation.enableValidation();

Promise.all([api.getUserMe(), api.getInitialCards()])
  .then(([userMe, cards]) => {
    userInfo.setUserId(userMe._id);
    userInfo.setUserInfo(userMe.name, userMe.about);
    userInfo.setUserAvatar(userMe.avatar);
    cardList = new Section(
      {
        items: cards,
        renderer: (card) => {
          const cardElement = new Card(
            card,
            userInfo.getUserId(),
            "#element",
            () => {
              api.addLikeCard(card._id).catch((err) => {
                console.log(err);
              });
            },
            () => {
              api.deleteLikeCard(card._id).catch((err) => {
                console.log(err);
              });
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

profileEditButton.addEventListener("click", () => {
  editFormValidation.resetValidation();
  popupWithEditForm.open();
});

profileEditAvatarButton.addEventListener("click", () => {
  editAvatarFormValidation.resetValidation();
  popupWithEditAvatorForm.open();
});

profileAddButton.addEventListener("click", () => {
  addFormValidation.resetValidation();
  popupWithAddForm.open();
});
