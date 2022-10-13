export const BASE_URL = 'https://auth.nomoreparties.co'

const handleResponse = (res) =>
  res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
};

export const getCheckToken = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(handleResponse)
};