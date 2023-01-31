import "./index.css";
import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { settings, config } from "../utils/constants.js";
import { setButtonActive } from "../utils/utils.js";

let cardList;
const api = new Api(config);
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__image"
);
const editForm = document.forms[0];
const popupEditSaveButton = editForm.querySelector(".popup__save-button");
const editFormValidation = new FormValidator(settings, editForm);

const addForm = document.forms[1];
const popupAddSaveButton = addForm.querySelector(".popup__save-button");
const addFormValidation = new FormValidator(settings, addForm);

const editAvatarForm = document.forms[2];
const popupEditAvatarSaveButton = editAvatarForm.querySelector(
  ".popup__save-button"
);
const editAvatarFormValidation = new FormValidator(settings, editAvatarForm);

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
          api.addLikeCard(card._id);
        },
        () => {
          api.deleteLikeCard(card._id);
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
      setButtonActive(popupAddSaveButton, 'popup__save-button_inactive', false)
    });
});
popupWithAddForm.setEventListeners();

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
    const nameInput = editForm.querySelector('#edit-name-input');
    const aboutInput = editForm.querySelector('#edit-about-input');
    nameInput.value = userInfo.getUserInfo().name;
    aboutInput.value = userInfo.getUserInfo().about
  }
);
popupWithEditForm.setEventListeners()

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
        setButtonActive(popupEditAvatarSaveButton, 'popup__save-button_inactive', false)
      });
  }
);
popupWithEditAvatorForm.setEventListeners()

const popupWithImage = new PopupWithImage(".popup_fullsize-image");
popupWithImage.setEventListeners()

const profile = document.querySelector(".profile");
const profileAddButton = profile.querySelector(".profile__add-button");
const profileEditButton = profile.querySelector(".profile__edit-button");
const profileEditAvatarButton = profile.querySelector(
  ".profile__edit-image-button"
);

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
              api.addLikeCard(card._id);
            },
            () => {
              api.deleteLikeCard(card._id);
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
  editFormValidation.clearValidation()
  setButtonActive(popupEditSaveButton, 'popup__save-button_inactive', true)
  popupWithEditForm.open();
});

profileEditAvatarButton.addEventListener("click", () => {
  editAvatarFormValidation.clearValidation()
  popupWithEditAvatorForm.open();
});

profileAddButton.addEventListener("click", () => {
  addFormValidation.clearValidation()
  popupWithAddForm.open();
});


