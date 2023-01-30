export default class Card {
  constructor(
    { name, link, _id, owner, likes },
    userId,
    selector,
    addLikeHandler,
    deleteLikeHandler,
    handleCardClick
    // deleteCardHandler,
  ) {
    this._title = name;
    this._src = link;
    this._cardId = _id;
    this._userId = userId;
    this._ownerId = owner._id;
    this._likes = likes;
    this._selector = selector;
    this._addLikeHandler = addLikeHandler;
    this._deleteLikeHandler = deleteLikeHandler;
    this._handleCardclick = handleCardClick;
  // this._deleteCardHandler = deleteCardHandler;
    this._card = this._getTemplate();
    this._image = this._card.querySelector(".element__image");
    this._imageTitle = this._card.querySelector(".element__title");
    this._likeCount = this._card.querySelector(".element__like-count");
    this._likeButton = this._card.querySelector(".element__like-button");
    this._removeButton = this._card.querySelector(".element__remove-button");
  }

  _getTemplate() {
    const cardTemplate =  document
    .querySelector(this._selector)
    .content
    .querySelector('.element')
    .cloneNode(true);
    return cardTemplate
  }

  _initialLikes() {
    this._likes.forEach(({ _id }) => {
      if (_id === this._userId) {
        this._likeButton.classList.add("element__like-button_active");
      }
    });
  }

  _renderLike() {
    this._likeButton.classList.add("element__like-button_active");
    this._likeCount.textContent = +this._likeCount.textContent + 1;
  }

  _renderUnlike() {
    this._likeButton.classList.remove("element__like-button_active");
    this._likeCount.textContent = +this._likeCount.textContent - 1;
  }

  _likeCard(isLiked) {
    isLiked ? this._renderLike() : this._renderUnlike();
  }

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
      if (!this._likeButton.classList.contains("element__like-button_active")) {
        this._addLikeHandler(this._cardId, this._likes);
        this._likeCard(true);
      } else {
        this._deleteLikeHandler(this._cardId, this._likes);
        this._likeCard(false);
      }
    });
    this._removeButton.addEventListener("click", () => {
      this._deleteCard();
    });
    this._image.addEventListener("click", () => {
      console.log('ok')
      this._handleCardclick();
    });
  }

  generate() {
    this._image.src = this._src;
    this._image.alt = this._title;
    this._imageTitle.textContent = this._title;
    this._likeCount.textContent = this._likes.length;
    this._initialLikes();
    this._setEventListeners();
    return this._card;
  }
}
