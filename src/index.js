import './pages/index.css';

import {initialCards, getRandomCard} from './scripts/cards'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsListContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

if (addCardButton !== null) {
  addCardButton.addEventListener("click", () => {
    const card = createCard(getRandomCard(), deleteCard);
    card !== undefined && cardsListContainer.append(card);
  });
}

// @todo: Функция создания карточки
const createCard = (cardItem, deleteCardCallback) => {
  if (
    typeof cardItem !== "object" ||
    cardItem.name === undefined ||
    cardItem.link === undefined
  )
    return undefined;

  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  imageElement.src = cardItem.link;
  imageElement.alt = `Изображение ${cardItem.name}`;
  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCardCallback);
  return cardElement;
};

// @todo: Функция удаления карточки
const deleteCard = (e) => {
  if (!e.target)
    return;

  const parentElement = e.target.closest('.card')
  parentElement && parentElement.remove();
};

// @todo: Вывести карточки на страницу
const drawCards = () => {
  initialCards.forEach((cardItem) => {
    const card = createCard(cardItem, deleteCard);
    card !== undefined && cardsListContainer.append(card);
  });
};

drawCards();
