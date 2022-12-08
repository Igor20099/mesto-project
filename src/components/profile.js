import { getUserMe } from "./api";
//profile
export const profile = document.querySelector(".profile");
export const profileName = profile.querySelector(".profile__name");
export const profileAbout = profile.querySelector(".profile__about");
export const profileAvatar = profile.querySelector(".profile__image");
export const profileEditButton = profile.querySelector(".profile__edit-button");
export const profileAddButton = profile.querySelector(".profile__add-button");

getUserMe().then(userMe => {
    profile.id = userMe._id;
    profileName.textContent = userMe.name;
    profileAbout.textContent = userMe.about;
    profileAvatar.src = userMe.avatar
 })

