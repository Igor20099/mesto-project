export default class UserInfo {
  constructor(nameSelector, aboutSelector, avatarSelector) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  //устанавливаем id пользователя
  setUserId(id) {
    this._userId = id;
  }

  //получаем id пользователя
  getUserId() {
    return this._userId;
  }

  //получаем объект данных пользователя
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent,
    };
  }

  //устанавливаем данные пользователя
  setUserInfo(name, about) {
    this._name.textContent = name;
    this._about.textContent = about;
  }

  //устанавливаем аватар пользователя
  setUserAvatar(avatarLink) {
    this._avatar.src = avatarLink;
  }
}
