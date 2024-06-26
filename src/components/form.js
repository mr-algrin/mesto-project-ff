export const updateAvatarForm = document.forms["update-avatar"];
export const profileForm = document.forms["edit-profile"];
export const newCardForm = document.forms["new-place"];

const profileFormName = profileForm.elements.name;
const profileFormDescription = profileForm.elements.description;
const placeNameField = newCardForm.elements["place-name"];
const linkField = newCardForm.elements["link"];
const avatarUrlField = updateAvatarForm.elements.url;

export const initialFormButtonLabel = "Сохранить";
export const savingFormButtonLabel = "Сохранение..."

export const changeFormButtonLabel = (formElement, label) => {
  const elementButton = formElement.querySelector('.popup__button')
  if (elementButton !== null)
    elementButton.textContent = label;
}

export const getUpdateAvatarFormData = () => (avatarUrlField ? avatarUrlField.value : "")

export const clearUpdateAvatarFormData = () => {
  if (avatarUrlField) {
    avatarUrlField.value = "";
  }
}

/**
 *
 * @param {*} data
 */
export const setProfileFormData = (data) => {
  const { title, description } = data;

  if (profileFormName) profileFormName.value = title || "";
  if (profileFormDescription) profileFormDescription.value = description || "";
};

export const getProfileFormData = () => {
  const data = { title: "", description: "" };

  if (profileFormName) data.title = profileFormName.value;
  if (profileFormDescription) data.description = profileFormDescription.value;
  return data;
};

export const getNewCardFormData = () => {
  const card = { name: "", link: "" };

  if (placeNameField) card.name = placeNameField.value;
  if (linkField) card.link = linkField.value;
  return card;
};

export const clearNewCardFormData = () => {
  if (placeNameField) placeNameField.value = "";

  if (linkField) linkField.value = "";
};

export const setImageFormData = (data) => {
  const imageElement = document.querySelector(".popup__image");
  if (imageElement) {
    imageElement.src = data.link;
    imageElement.alt = `Изображение ${data.name}`;
  }

  const captionElement = document.querySelector(".popup__caption");
  if (captionElement) {
    captionElement.textContent = data.name;
  }
};
