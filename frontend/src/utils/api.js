export const BASE_URL = 'https://api.polina.mesto.nomoredomains.icu';
class Api {
    constructor({ baseUrl, headers}) {
        this._headers = headers
        this._baseUrl = baseUrl
      // тело конструктора
    }

    _checkResponse(res) {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    }

// ИНФОРМАЦИЯ О ПОЛЬЗОВАТЕЛЕ

    getProfile () {
      return fetch (`${this._baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          "Authorization": getToken(),
          'Content-Type': 'application/json'
        }
        }).then(this._checkResponse)
    }

// КАРТОЧКИ

    getInitialCards() {
      return fetch (`${this._baseUrl}/cards`, {
        headers: {
          "Authorization": getToken(),
          'Content-Type': 'application/json'
        }
      }).then(this._checkResponse)
    }

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

    editProfile(item) {
      return fetch (`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: {
            "Authorization": getToken(),
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: item.name, 
            about: item.job
          })
      }).then(this._checkResponse)
    }

// АВАТАР

editAvatar(item) {
  return fetch(`${this._baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      "Authorization": getToken(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatar: item.avatar
    })
  }).then(this._checkResponse)
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

addCard(data) {
  return fetch (`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name, 
        link: data.link
      })
  }).then(this._checkResponse)
}

// УДАЛЕНИЕ КАРТОЧКИ

    deleteCard(id) {
      return fetch (`${this._baseUrl}/cards/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": getToken(),
            'Content-Type': 'application/json'
          },
      }).then(this._checkResponse)
    }

// ПОСТАНОВКА И СНЯТИЕ ЛАЙКА
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: `${isLiked ?'PUT':'DELETE'}`,
      headers: {
        "Authorization": getToken(),
        'Content-Type': 'application/json'
      },
    })
      .then(this._checkResponse)
  }
}

const getToken = () => {
  return `Bearer ${localStorage.getItem('jwt')}`;
}
  
  export const api = new Api({
    baseUrl: BASE_URL,
    // headers: {
    //   // authorization: '2d3b8a20-7c88-48c1-9e40-d676058753f5',
    //   'Content-Type': 'application/json'
    // }
  }); 
