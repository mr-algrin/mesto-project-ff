import { profileTitle, profileDescription, profileAvatar } from "./element";

export const userInfo = {
  name: "",
  about: "",
  avatar: "",
  _id: "",
  cohort: "",
};

const setUserInfo = (info) => {
  Object.keys(userInfo).forEach((key) => {
    if (key in info) {
      userInfo[key] = info[key];
    }
  });
};

export const userStateManager = {
  setUserInfo,
};

export const renderUserInfo = () => {
  const { about, name, avatar } = userInfo;

  if (name && profileTitle) profileTitle.textContent = name;

  if (about && profileDescription) profileDescription.textContent = about;

  if (avatar && profileAvatar)
    profileAvatar.style["background-image"] = `url(${avatar})`;
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
