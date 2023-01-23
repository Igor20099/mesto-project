export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
  }

  setUserId(id) {
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }

  
}


//profile
export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileAbout = profile.querySelector(".profile__about");
export const profileAvatar = profile.querySelector(".profile__image");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");
export const profileEditAvatarButton = profile.querySelector('.profile__edit-image-button');
