//card
import {
  popupImage,
  popupImageTitle,
  popupFullsizeImage,
  openPopup,
} from "./popup";

import { deleteCardHandler, addLikeHandler, deleteLikeHandler } from "./index";

export const elementContainer = document.querySelector(".elements");
export const elementTemplate = document.querySelector("#element").content;

//функция лайка карточки
export function likeCard(element, likeCount, userMe) {
  const elementLikeButton = element.querySelector(".element__like-button");
  const elementLikeCount = element.querySelector(".element__like-count");
  if (likeCount.length > 0) {
    likeCount.forEach((user) => {
      if (user._id === userMe.id) {
        elementLikeButton.classList.add("element__like-button_active");
      } else {
        elementLikeButton.classList.remove("element__like-button_active");
      }
    });
  } else {
    elementLikeButton.classList.remove("element__like-button_active");
  }
  elementLikeCount.textContent = likeCount.length;
}

//функция отображения карточки
export function renderCard(item, userMe,) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  const elementLikeButton = element.querySelector(".element__like-button");
  const elementImage = element.querySelector(".element__image");
  element.id = item._id;
  elementImage.src = item.link;
  elementImage.alt = item.name;
  elementImage.addEventListener("click", () => {
    popupImage.src = elementImage.src;
    popupImage.alt = elementImage.alt;
    popupImageTitle.textContent = elementImage.alt;
    openPopup(popupFullsizeImage);
  });
  element.querySelector(".element__title").textContent = item.name;

  if (userMe.id === item.owner._id) {
    const elementRemoveButton = element.querySelector(
      ".element__remove-button"
    );
    elementRemoveButton.classList.add("element__remove-button_active");
    elementRemoveButton.addEventListener('click', () => {
      deleteCardHandler(element)
    })
  }
  elementLikeButton.addEventListener('click', () => {
    if(!elementLikeButton.classList.contains('element__like-button_active')) {
      addLikeHandler(element,item, userMe)
    }
    else {
      deleteLikeHandler(element,item, userMe)
    }
  })
  likeCard(element, item.likes, userMe);
  return element;
}
