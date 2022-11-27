//card
import {
  popupImage,
  popupImageTitle,
  popupFullsizeImage,
  openPopup,
} from "./popup";
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
    element.remove();
  });
}

//функция отображения карточки
export function renderCard(item) {
  const element = elementTemplate.querySelector(".element").cloneNode(true);
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.name;
  element.querySelector(".element__image").addEventListener("click", () => {
    popupImage.src = element.querySelector(".element__image").src;
    popupImage.alt = element.querySelector(".element__image").alt;
    popupImageTitle.textContent = element.querySelector(".element__image").alt;
    openPopup(popupFullsizeImage);
  });
  element.querySelector(".element__title").textContent = item.name;
  likeCard(element);
  removeCard(element);
  return element;
}
