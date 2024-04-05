import { cardTemplateElement } from "./element";
import {Api} from "../lib/api";

const cardTemplate = cardTemplateElement.content;

const getCardElementId = (cardElement) => cardElement.dataset.id;

const checkOwnerLiked = (likes, id) => likes.some(c => c._id === id);

export const createCard = (
  cardItem,
  ownerId,
  deleteCallback,
  likeCallback,
  openCallback
) => {
  if (
    typeof cardItem !== "object" ||
    cardItem.name === undefined ||
    cardItem.link === undefined
  )
    return undefined;
  const cardElement = cardTemplate.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const cardDeleteButtonElement = cardElement.querySelector(".card__delete-button")
  cardElement.querySelector(".card__title").textContent = cardItem.name;

  const rootElement = cardElement.querySelector('.card')
  if (rootElement) {
    rootElement.dataset.id = cardItem._id;
  }

  if (imageElement !== null) {
    imageElement.src = cardItem.link;
    imageElement.alt = `Изображение ${cardItem.name}`;
    imageElement.addEventListener("click", openCallback);
  }

  if (cardDeleteButtonElement !== null) {
    cardDeleteButtonElement.addEventListener("click", deleteCallback);
    if (cardItem.owner._id !== ownerId)
      cardDeleteButtonElement.classList.add('card__delete-button_disabled');
  }

  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCallback);

  const isLikedByOwner = checkOwnerLiked(cardItem.likes, ownerId);
  const likeButtonElement = cardElement.querySelector('.card__like-button');
  isLikedByOwner
    ? likeButtonElement.classList.add('card__like-button_is-active')
    : likeButtonElement.classList.remove('card__like-button_is-active')
  updateLikesCount(cardElement, cardItem.likes.length);
  return cardElement;
};

const updateLikesCount = (cardElement, likesCount) => {
  const likesCountElement = cardElement.querySelector('.card__like-counter');
  likesCountElement.textContent = likesCount;
}

/**
 * Retrieve card
 * @param {*} element
 */
export const getCardData = (element) => {
  const data = { name: "", link: "" };
  if (element) {
    const titleElement = element.querySelector(".card__title");
    if (titleElement) data.name = titleElement.textContent;

    const imageElement = element.querySelector(".card__image");
    if (imageElement) data.link = imageElement.src;
  }

  return data;
};

export const likeCardHandler = (evt) => {
  if (!evt.target) return;

  evt.stopPropagation();
  const cardElement = evt.target.closest('.card');
  const cardId = getCardElementId(cardElement);
  const isLiked = evt.target.classList.contains('card__like-button_is-active');
  if (isLiked) {
    Api.dislikeCard(cardId)
      .then(res => {
        updateLikesCount(cardElement, res.likes.length);
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch(err => console.log(err))
  }
  else {
    Api.likeCard(cardId)
      .then(res => {
        updateLikesCount(cardElement, res.likes.length);
        evt.target.classList.toggle("card__like-button_is-active");
      })
      .catch(err => console.log(err))
  }
  // evt.target.classList.toggle("card__like-button_is-active");
};

export const deleteCardHandler = (evt) => {
  if (!evt.target) return;

  evt.stopPropagation();
  const parentElement = evt.target.closest(".card");
  const cardId = getCardElementId(parentElement);
  if (cardId) {
    Api.deleteCard(cardId)
      .then(() => {
        parentElement?.remove();
      })
      .catch(err => console.log(err))
  }
};
