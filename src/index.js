import "./pages/index.css";

import {
  createCard,
  getCardData,
  likeCardHandler,
  deleteCardHandler,
} from "./components/card";
import { closeModal, openModal } from "./components/modal";
import {
  setProfileFormData,
  getProfileFormData,
  getNewCardFormData,
  clearNewCardFormData,
  setImageFormData,
  getUpdateAvatarFormData,
  clearUpdateAvatarFormData,
  profileForm,
  newCardForm,
  updateAvatarForm,
} from "./components/form";
import { CardsStateManager, cardsCollection } from "./components/cards";
import {UserStateManager, getProfileData, renderUserInfo, userInfo} from "./components/profile";
import * as elements from "./components/element";

import { Api } from "./lib/api";

// Set up handler for opening the update avatar pop-up window
if (elements.profileAvatar) {
  elements.profileAvatar.addEventListener('click', () => {
    openModal(elements.updateAvatarPopup);
  })
}

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

// Set up handler for profile avatar update form
if (updateAvatarForm) {
  updateAvatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const avatarUrl = getUpdateAvatarFormData();
    clearUpdateAvatarFormData();
    closeModal(elements.updateAvatarPopup);
    Api.updateUserAvatar(avatarUrl)
      .then(userInfo => {
        UserStateManager.setUserInfo(userInfo);
        renderUserInfo();
      })
      .catch(err => console.log(err))
  })
}

// Set up handler for sending profile editing form
if (profileForm) {
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = getProfileFormData();
    // setProfileData(data);
    closeModal(elements.editPopup);
    console.log(data);
    Api.updateUserInfo(data.title, data.description)
      .then(res => {
        UserStateManager.setUserInfo(res);
        renderUserInfo();
      })
      .catch(err => console.log(err))
  });
}

if (newCardForm) {
  newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardData = getNewCardFormData();
    clearNewCardFormData();
    closeModal(elements.newCardPopup);
    Api.addCard(cardData.name, cardData.link)
      .then((cardData) => {
        CardsStateManager.addCard(cardData);
        // TODO: in renderCards need clear all child of cardsListContainer and render new cards
        // renderCards();
        const card = createCard(
          cardData,
          userInfo._id,
          deleteCardHandler,
          likeCardHandler,
          openCardHandler
        );
        elements.cardsListContainer && elements.cardsListContainer.prepend(card);
      })
      .catch(err => console.log(err));
  });
}

const openCardHandler = (evt) => {
  if (!evt.target) return;

  evt.stopPropagation();
  const data = getCardData(evt.target.closest(".card"));
  setImageFormData(data);
  openModal(elements.imagePopup);
};

export const renderCards = () => {
  console.log('renderCards:', cardsCollection.length);
  cardsCollection.forEach((cardItem) => {
    const card = createCard(
      cardItem,
      userInfo._id,
      deleteCardHandler,
      likeCardHandler,
      openCardHandler
    );
    card !== undefined && elements.cardsListContainer.append(card);
  });
}

// Entry point
Promise
  .all([Api.getUserInfo(), Api.getCards()])
  .then(responses => {
    UserStateManager.setUserInfo(responses[0]);
    CardsStateManager.setCards(responses[1]);
    renderCards();
    renderUserInfo();
  })
  .catch((err) => console.log(err))
