import { profileTitle, profileDescription } from "./element";

/**
 * Setting up a profile name and description
 * @param {*} data
 */
export const setProfileData = (data) => {
  const { title, description } = data;

  if (title && profileTitle) profileTitle.textContent = title;

  if (description && profileDescription)
    profileDescription.textContent = description;
};

/**
 * Extracting profile title and description
 * @returns {Object}
 */
export const getProfileData = () => {
  const data = { title: "", description: "" };

  if (profileTitle) data.title = profileTitle.textContent;

  if (profileDescription) data.description = profileDescription.textContent;

  return data;
};
