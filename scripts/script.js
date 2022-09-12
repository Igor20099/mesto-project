const profileInfo = document.querySelector('.profile__info')
const profileEditButton = profileInfo.querySelector('.profile__edit-button');
const profileName = profileInfo.querySelector('.profile__name');
const profileAbout = profileInfo.querySelector('.profile__about');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close-button');

const profileAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_add-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close-button');
const linkImageInput = popupAddCard.querySelector('.popup__edit-input_type_link-image')
const AddformElement = popupAddCard.querySelector('.popup__edit-info');
const AddnameInput = popupAddCard.querySelector('.popup__edit-input_type_name');

const formElement = document.querySelector('.popup__edit-info');
const nameInput = document.querySelector('.popup__edit-input_type_name');
const aboutInput = document.querySelector('.popup__edit-input_type_about');

const elementlikeButton = document.querySelector('.element__like-button')

const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

//Массив карточек
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  function renderCard(item) {
    const element = elementTemplate.querySelector('.element').cloneNode(true);
    element.querySelector('.element__image').src = item.link;
    element.querySelector('.element__image').alt = item.name;
    element.querySelector('.element__title').textContent = item.name;  
    likeElement(element)
    removeElement(element)
    elements.prepend(element);
  }

  function likeElement(element) {
    const elementLikeButton = element.querySelector('.element__like-button');
    elementLikeButton.addEventListener('click', () => {
        elementLikeButton.classList.toggle('element__like-button_active');
    })
  }

  function removeElement(element) {
    const elementRemoveButton = element.querySelector('.element__remove-button');
    elementRemoveButton.addEventListener('click',() => {
            element.remove();
    });
}

  initialCards.forEach(item => {
    renderCard(item);
  })

function formSubmitHandler (evt) {
    evt.preventDefault(); 
     const nameValue = nameInput.value;
     const aboutValue = aboutInput.value;
     profileName.textContent = nameValue;
     profileAbout.textContent = aboutValue;
     closePopup(popupEditProfile);
}

function AddformSubmitHandler (evt) {
    evt.preventDefault(); 
     const AddNameValue = AddnameInput.value;
     const linkImageValue = linkImageInput.value;
     const card = {};
     card.name =  AddNameValue
     card.link =  linkImageValue
     renderCard(card)
     AddnameInput.value = ''
     linkImageInput.value = ''
     closePopup(popupAddCard);
}
AddformElement.addEventListener('submit', AddformSubmitHandler); 
formElement.addEventListener('submit', formSubmitHandler); 

function openPopup (popup) {
    popup.classList.add('popup_opened');
}

function closePopup (popup) {
    popup.classList.remove('popup_opened')
}


profileEditButton.addEventListener('click',() => {
    openPopup(popupEditProfile)
});

popupEditProfileCloseButton.addEventListener('click', () => {
    closePopup(popupEditProfile)
});

profileAddButton.addEventListener('click',() => {
    openPopup(popupAddCard)
});

popupAddCardCloseButton.addEventListener('click', () => {
    closePopup(popupAddCard)
});
