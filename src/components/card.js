import { cardTemplateElement } from "./element";

const cardTemplate = cardTemplateElement.content;

/**
 * Create new card element
 * @param {*} cardItem
 * @param {*} deleteCardCallback
 * @returns
 */
export const createCard = (
  cardItem,
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
  imageElement.src = cardItem.link;
  imageElement.alt = `Изображение ${cardItem.name}`;
  imageElement.addEventListener("click", openCallback);
  cardElement.querySelector(".card__title").textContent = cardItem.name;
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCallback);
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", likeCallback);
  return cardElement;
};

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
  evt.target.classList.toggle("card__like-button_is-active");
};

export const deleteCardHandler = (evt) => {
  if (!evt.target) return;

  evt.stopPropagation();
  const parentElement = evt.target.closest(".card");
  parentElement && parentElement.remove();
};
