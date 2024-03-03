let activePopupElement = undefined;

const getCloseButton = (element) => element.querySelector(".popup__close");

/**
 * Close button click handler
 * @param {*} evt
 */
const closeButtonClickHandler = (evt) => {
  evt.preventDefault();
  evt.stopPropagation();
  closeModal(activePopupElement);
};

/**
 * Close popup when click on overlay
 * @param {*} evt
 */
const overlayClickHandler = (evt) => {
  if (evt.target.classList.contains("popup")) closeModal(activePopupElement);
};

/**
 * Close popup when `escape` key pressed
 * @param {*} evt
 */
const keyboardHandler = (evt) => {
  evt.key === "Escape" && closeModal(activePopupElement);
};

export const openModal = (element) => {
  if (element) {
    activePopupElement = element;
    element.classList.add("popup_is-opened", "popup_is-animated");

    // add close handlers
    element.addEventListener("click", overlayClickHandler);
    document.addEventListener("keydown", keyboardHandler);
    const closeButton = getCloseButton(element);
    closeButton?.addEventListener("click", closeButtonClickHandler);
  }
};

export const closeModal = (element) => {
  if (element) {
    element.classList.remove("popup_is-opened", "popup_is-animated");
    const closeButton = getCloseButton(element);
    closeButton?.removeEventListener("click", closeButtonClickHandler);
    document.removeEventListener("keydown", keyboardHandler);
    element.removeEventListener("click", overlayClickHandler);
    activePopupElement = undefined;
  }
};
