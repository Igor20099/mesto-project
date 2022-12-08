//card
import {
  popupImage,
  popupImageTitle,
  popupFullsizeImage,
  openPopup,
} from "./popup";

import { deleteCard } from "./api";

export const elementContainer = document.querySelector(".elements");
export const elementTemplate = document.querySelector("#element").content;
export const elementlikeButton = document.querySelector(
  ".element__like-button"
);

//функция лайка карточки
export function likeCard(element) {
  const elementLikeButton = element.querySelector(".element__like-button");
  elementLikeButton.addEventListener("click", () => {
    elementLikeButton.classList.toggle("element__like-button_active");
  });
}

//функция удаление карточки
export function removeCard(element) {
  const elementRemoveButton = element.querySelector(".element__remove-button");
  elementRemoveButton.addEventListener("click", () => {
    deleteCard(element.id)
    element.remove();
  });
}

//функция отображения карточки
export function renderCard(item, userMe) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  element.id = item._id;
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.name;
  element.querySelector(".element__image").addEventListener("click", () => {
    popupImage.src = element.querySelector(".element__image").src;
    popupImage.alt = element.querySelector(".element__image").alt;
    popupImageTitle.textContent = element.querySelector(".element__image").alt;
    openPopup(popupFullsizeImage);
  });
  element.querySelector(".element__title").textContent = item.name;
  const elementLikeCount = element.querySelector(".element__like-count");
  if (item.likes.length > 0) {
    elementLikeCount.textContent = item.likes.length;
  }
  if (userMe._id === item.owner._id) {
    const elementRemoveButton = element.querySelector(
      ".element__remove-button"
    );
    elementRemoveButton.classList.add("element__remove-button_active");
  }
  likeCard(element);
  removeCard(element);
  return element;
}
