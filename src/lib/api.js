const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-10',
  headers: {
    authorization: 'b7626373-9d6a-49f5-8ea3-25c2d7a22671',
    'Content-Type': 'application/json'
  }
}

const url = (path) => (config.baseUrl + path)


const handleResponseData = (res) => {
  if (res.ok)
    return res.json();
  return Promise.reject(`Ошибка: ${res.status}`)
}

const getUserInfo = () => {
  return fetch(url('/users/me'), {
    headers: config.headers
  })
    .then(handleResponseData)
}

const updateUserInfo = (name, about) => {
  return fetch(url('/users/me'), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({name, about})
  })
    .then(handleResponseData)
}

const updateUserAvatar = (avatar) => {
  return fetch(url('/users/me/avatar'), {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar})
  })
    .then(handleResponseData)
}

const getCards = () => {
  return fetch(url('/cards'), {
    headers: config.headers
  })
    .then(handleResponseData)
}

const addCard = (name, link) => {
  if (typeof name !== 'string' || typeof link !== 'string')
    return Promise.reject('Ошибка: невалидное значение');

  return fetch(url('/cards'), {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({name, link})
  })
    .then(handleResponseData)
}

const deleteCard = (cardId) => {
  return fetch(url(`/cards/${cardId}`), {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(handleResponseData)
}

const likeCard = (cardId) => {
  return fetch(url(`/cards/likes/${cardId}`), {
    method: 'PUT',
    headers: config.headers,
  })
    .then(handleResponseData)
}

const dislikeCard = (cardId) => {
  return fetch(url(`/cards/likes/${cardId}`), {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(handleResponseData)
}

export const api = {
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  getCards,
  addCard,
  deleteCard,
  likeCard,
  dislikeCard
}
