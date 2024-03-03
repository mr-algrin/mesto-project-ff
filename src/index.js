import "./pages/index.css";

import {
  createCard,
  getCardData,
  likeCardHandler,
  deleteCardHandler,
} from "./components/card";
import { initialCards } from "./components/cards";
import { closeModal, openModal } from "./components/modal";
import {
  setProfileFormData,
  getProfileFormData,
  getNewCardFormData,
  clearNewCardFormData,
  setImageFormData,
  profileForm,
  newCardForm,
} from "./components/form";
import { getProfileData, setProfileData } from "./components/profile";
import * as elements from "./components/element";

// Set up handler for opening the editing pop-up window
if (elements.editProfileButton) {
  elements.editProfileButton.addEventListener("click", () => {
    const data = getProfileData();
    setProfileFormData(data);
    openModal(elements.editPopup);
  });
}

// Set up handler for opening card creation pop-up
if (elements.addCardButton !== null) {
  elements.addCardButton.addEventListener("click", () =>
    openModal(elements.newCardPopup)
  );
}

// Set up handler for sending profile editing form
if (profileForm) {
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = getProfileFormData();
    setProfileData(data);
    closeModal(elements.editPopup);
  });
}

if (newCardForm) {
  newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardData = getNewCardFormData();
    clearNewCardFormData();
    const card = createCard(
      cardData,
      deleteCardHandler,
      likeCardHandler,
      openCardHandler
    );
    elements.cardsListContainer && elements.cardsListContainer.prepend(card);
    closeModal(elements.newCardPopup);
  });
}

const openCardHandler = (evt) => {
  if (!evt.target) return;

  evt.stopPropagation();
  const data = getCardData(evt.target.closest(".card"));
  setImageFormData(data);
  openModal(elements.imagePoup);
};

// @todo: Вывести карточки на страницу
const drawDefaultCards = () => {
  initialCards.forEach((cardItem) => {
    const card = createCard(
      cardItem,
      deleteCardHandler,
      likeCardHandler,
      openCardHandler
    );
    card !== undefined && elements.cardsListContainer.append(card);
  });
};

drawDefaultCards();
