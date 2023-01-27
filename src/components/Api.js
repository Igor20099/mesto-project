export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }
  
  getUserMe() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  editProfileInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}



//Получаем свои данные (###)
// export function getUserMe() {
//   return fetch(`${config.baseUrl}/users/me`, {
//     headers: config.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }

//Получаем карточки (###)
// export function getInitialCards() {
//   return fetch(`${config.baseUrl}/cards`, {
//     headers: config.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }

//Редактируем в профиле имя и о себе (###)
// export function editProfileInfo(name, about) {
//   return fetch(`${config.baseUrl}/users/me`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about,
//     }),
//   });
// }

//Меняем аватар (###)
// export function changeAvatar(avatar) {
//   return fetch(`${config.baseUrl}/users/me/avatar`, {
//     method: "PATCH",
//     headers: config.headers,
//     body: JSON.stringify({
//       avatar:avatar
//     }),
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }

//Отправляем новую карточку на сервер (###)
// export function addCard(name, link) {
//   return fetch(`${config.baseUrl}/cards`, {
//     method: "POST",
//     headers: config.headers,
//     body: JSON.stringify({
//       name: name,
//       link: link,
//     }),
//   }).then(res => {
//     if (res.ok) {
//       return res.json();
//     }

//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }

//Удаляем карточку с сервера (###)
// export function deleteCard(cardId) {
//   return fetch(`${config.baseUrl}/cards/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   });
// }

//Добавляем карточке лайк (###)
// export function addLikeCard(cardId) {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }

//Удаляем у карточки лайк
// export function deleteLikeCard(cardId) {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка: ${res.status}`);
//   });
// }
