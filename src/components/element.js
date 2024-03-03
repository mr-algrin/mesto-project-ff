/**
 * В файле описаны все dom-элементы которые используются в других компонентах
 */

export const cardTemplateElement = document.querySelector("#card-template");
export const cardsListContainer = document.querySelector(".places__list");

// Label elements
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);

// Buttton elements
export const addCardButton = document.querySelector(".profile__add-button");
export const editProfileButton = document.querySelector(
  ".profile__edit-button"
);

// Popup components
export const editPopup = document.querySelector(".popup_type_edit");
export const newCardPopup = document.querySelector(".popup_type_new-card");
export const imagePoup = document.querySelector(".popup_type_image");
