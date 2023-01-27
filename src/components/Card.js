export default class Card {
  constructor(
    { title, src, cardId, owner, likes },
    userId,
    selector,
    addLikeHandler,
    deleteLikeHandler,
    deleteCardHandler,
    handleCardClick
  ) {
    this._title = title;
    this._src = src;
    this._cardId = cardId;
    this._userId = userId;
    this._ownerId = owner._id;
    this._likes = likes;
    this._selector = selector;
    this._addLikeHandler = addLikeHandler;

    this._deleteCardHandler = deleteCardHandler;
    this._handleCardclick = handleCardClick;
    this._deleteLikeHandler = deleteLikeHandler;
    this._card = this._getTemplate();
    this._image = this._card.querySelector(".element__image");
    this._imageTitle = this._card.querySelector(".element__title");
    this._likeCount = this._card.querySelector(".element__likes-count");
    this._likeButton = this._card.querySelector(".element__like-button");
    this._removeButton = this._card.querySelector(".element__remove-button");
  }

  _getTemplate() {
    const elementContainer = document.querySelector(this._selector);
    const elementTemplate = elementContainer.querySelector("#element");
    return elementTemplate.content.cloneNode(true);
  }

  _likeCard() {
    if (this._likes.length > 0) {
      this._likes.forEach((userId) => {
        if (ownerId === userId) {
          this._likeButton.classList.add("element__like-button_active");
        } else {
          this._likeButton.classList.remove("element__like-button_active");
        }
      });
    } else {
      this._likeButton.classList.remove("element__like-button_active");
    }
    this._likeCount.textContent = this._likes.length;
  }

  _deleteLikeCard() {}

  _deleteCard() {
    if (this._userId === this._ownerId) {
      this._removeButton.classList.add("element__remove-button_active");
      this._removeButton.addEventListener("click", () => {
        deleteCardHandler(this._card);
      });
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      if (
        !this._likeButton.classList.contains("element__like-button_active")
      ) {
        addLikeHandler(this._card, cardId, userId);
      } else {
        deleteLikeHandler(this._card, cardId, userId);
      }
      this._likeCard();
    });
    this._removeButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._card.addEventListener("click", () => {
      this._handleCardclick();
    });
  }

  generate() {
    this._image.src = this._src;
    this._image.alt = this._title;
    this._imageTitle.textContent = this._title;
    this._likeCount.textContent = this._likes.length;
    this._setEventListeners();
  }
}

//card

//функция отображения карточки
// export function renderCard(item, userMe) {
//   const element = elementTemplate.querySelector(".element").cloneNode(true);
//   const elementLikeButton = element.querySelector(".element__like-button");
//   const elementImage = element.querySelector(".element__image");
//   const elementTitle = element.querySelector(".element__title");
//   element.id = item._id;
//   elementImage.src = item.link;
//   elementImage.alt = item.name;
//   elementImage.addEventListener("click", () => {
//     popupImage.src = elementImage.src;
//     popupImage.alt = elementImage.alt;
//     popupImageTitle.textContent = elementImage.alt;
//     openPopup(popupFullsizeImage);
//   });
//   elementTitle.textContent = item.name;

//   if (userMe.id === item.owner._id) {
//     const elementRemoveButton = element.querySelector(
//       ".element__remove-button"
//     );
//     elementRemoveButton.classList.add("element__remove-button_active");
//     elementRemoveButton.addEventListener("click", () => {
//       deleteCardHandler(element);
//     });
//   }
//   elementLikeButton.addEventListener("click", () => {
//     if (!elementLikeButton.classList.contains("element__like-button_active")) {
//       addLikeHandler(element, item, userMe);
//     } else {
//       deleteLikeHandler(element, item, userMe);
//     }
//   });
//   likeCard(element, item.likes, userMe);
//   return element;
// }
