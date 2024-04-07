const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = errorMessage;
}

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  errorElement.textContent = "";
}

const isValid = (formElement, inputElement, validationConfig) => {
  inputElement.setCustomValidity(inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : "");

  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement);
  }
  else {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
}

export const enableValidation = (validationConfig) => {
  const {formSelector, inputSelector, submitButtonSelector} = validationConfig

  const formList = Array.from(document.querySelectorAll(formSelector))
  formList.forEach(formElement => {
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, validationConfig);
        toggleButtonState(inputList, buttonElement, validationConfig);
      })
    })
  });
}


export const clearValidation = (formElement, {
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) => {
  const formInputsError = Array.from(formElement.querySelectorAll(`.${inputErrorClass}`))
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  submitButtonElement.classList.add(inactiveButtonClass);
  formInputsError.forEach((errorElement) => {
    errorElement.textContent = "";
  })
}


const hasInvalidInput = (inputList) => inputList.some(input => !input.validity.valid);

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  hasInvalidInput(inputList)
    ? buttonElement.classList.add(validationConfig.inactiveButtonClass)
    : buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });
