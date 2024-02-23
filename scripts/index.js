// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardsListContainer = document.querySelector(".places__list");
const addCardButton = document.querySelector(".profile__add-button");

if (addCardButton !== null) {
  addCardButton.addEventListener("click", () =>
    createCard(getRandomCard(), deleteCard)
  );
}

// @todo: Функция создания карточки
const createCard = (cardItem, deleteCardCallback) => {
  if (typeof cardItem !== "object") return;

  if (cardItem.name === undefined || cardItem.link === undefined) return;

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(".card__image").src = cardItem.link;
  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCardCallback);
  cardsListContainer.append(cardElement);
};

// @todo: Функция удаления карточки
const deleteCard = (e) => {
  if (e.target && e.target.parentElement) e.target.parentElement.remove();
};

// @todo: Вывести карточки на страницу
const drawCards = () => {
  initialCards.forEach((cardItem) => createCard(cardItem, deleteCard));
};

drawCards();
