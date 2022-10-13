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
            headers: this._headers
        }).then(this._checkResponse)
    }

// КАРТОЧКИ

    getInitialCards() {
      return fetch (`${this._baseUrl}/cards`, {
          headers: this._headers
      }).then(this._checkResponse)
    }

// РЕДАКТИРОВАНИЕ ПРОФИЛЯ

    editProfile(item) {
      return fetch (`${this._baseUrl}/users/me`, {
          method: "PATCH",
          headers: this._headers,
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
    headers: this._headers,
    body: JSON.stringify({
      avatar: item.avatar
    })
  }).then(this._checkResponse)
}

// ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ

addCard(data) {
  return fetch (`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
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
          headers: this._headers
      }).then(this._checkResponse)
    }

// ПОСТАНОВКА И СНЯТИЕ ЛАЙКА
  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/likes/${id}`, {
      method: `${isLiked ?'PUT':'DELETE'}`,
      headers: this._headers
    })
      .then(this._checkResponse)
  }
}
  
  export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
    headers: {
      authorization: '2d3b8a20-7c88-48c1-9e40-d676058753f5',
      'Content-Type': 'application/json'
    }
  }); 
