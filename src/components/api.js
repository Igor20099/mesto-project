//Конфигурация
const config = {
  baseUrl: "https://nomoreparties.co/v1/plus-cohort-17",
  headers: {
    authorization: "e9f29ecd-7473-4cd5-991b-c4f08c138626",
    "Content-Type": "application/json",
  },
};

export function getUserMe() {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers,
      }).then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
}

export function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
  })
}
