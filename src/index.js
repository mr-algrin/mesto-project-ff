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
  updateAvatarForm, changeFormButtonLabel, initialFormButtonLabel, savingFormButtonLabel,
} from "./components/form";
import { CardsStateManager, cardsCollection } from "./components/cards";
import {UserStateManager, getProfileData, renderUserInfo, userInfo} from "./components/profile";
import * as elements from "./components/element";
import {clearValidation, enableValidation} from "./components/validation";

import { Api } from "./lib/api";

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_error',
  errorClass: 'popup__error_visible'
}


// Set up handler for opening the update avatar pop-up window
if (elements.profileAvatar) {
  elements.profileAvatar.addEventListener('click', () => {
    clearValidation(updateAvatarForm, validationConfig);
    changeFormButtonLabel(updateAvatarForm, initialFormButtonLabel);
    openModal(elements.updateAvatarPopup);
  })
}

// Set up handler for opening the editing pop-up window
if (elements.editProfileButton) {
  elements.editProfileButton.addEventListener("click", () => {
    const data = getProfileData();
    setProfileFormData(data);
    clearValidation(profileForm, validationConfig);
    changeFormButtonLabel(profileForm, initialFormButtonLabel);
    openModal(elements.editPopup);
  });
}

// Set up handler for opening card creation pop-up
if (elements.addCardButton !== null) {
  elements.addCardButton.addEventListener("click", () =>{
    clearNewCardFormData();
    clearValidation(newCardForm, validationConfig);
    changeFormButtonLabel(newCardForm, initialFormButtonLabel);
    openModal(elements.newCardPopup);
  });
}

// Set up handler for profile avatar update form
if (updateAvatarForm) {
  updateAvatarForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const avatarUrl = getUpdateAvatarFormData();
    changeFormButtonLabel(updateAvatarForm, savingFormButtonLabel);
    Api.updateUserAvatar(avatarUrl)
      .then(userInfo => {
        UserStateManager.setUserInfo(userInfo);
        renderUserInfo();
      })
      .catch(err => console.log(err))
      .finally(() => {
        clearUpdateAvatarFormData();
        closeModal(elements.updateAvatarPopup);
      })
  })
}

// Set up handler for sending profile editing form
if (profileForm) {
  profileForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const data = getProfileFormData();
    changeFormButtonLabel(profileForm, savingFormButtonLabel);
    Api.updateUserInfo(data.title, data.description)
      .then(res => {
        UserStateManager.setUserInfo(res);
        renderUserInfo();
      })
      .catch(err => console.log(err))
      .finally(() => closeModal(elements.editPopup));
  });
}

if (newCardForm) {
  newCardForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const cardData = getNewCardFormData();
    changeFormButtonLabel(newCardForm, savingFormButtonLabel);
    Api.addCard(cardData.name, cardData.link)
      .then((cardData) => {
        CardsStateManager.addCard(cardData);
        const card = createCard(
          cardData,
          userInfo._id,
          deleteCardHandler,
          likeCardHandler,
          openCardHandler
        );
        elements.cardsListContainer && elements.cardsListContainer.prepend(card);
      })
      .catch(err => console.log(err))
      .finally(() => {
        clearNewCardFormData();
        closeModal(elements.newCardPopup);
      })
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


enableValidation(validationConfig);
