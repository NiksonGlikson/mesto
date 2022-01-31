import "./index.css";
import { initialCards } from "../utils/constants.js";
import { configValidation } from "../utils/configValidation.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

const editBtn = document.querySelector(".profile__button-edit");
const addBtn = document.querySelector(".profile__button-add");
const profileForm = document.querySelector(".pop-up__form");
const formPlaces = document.querySelector(".pop-up__form_place");
const nameInput = profileForm.querySelector(".pop-up__input_profile_name");
const jobInput = profileForm.querySelector(".pop-up__input_profile_description");
const titleName = document.querySelector(".profile__title");
const subtitleName = document.querySelector(".profile__subtitle");
const elements = document.querySelector(".elements");
const inputEl = document.querySelector(".pop-up__input_name");
const inputPlace = document.querySelector(".pop-up__input_place");

function handleCardClick(name, link) {
  popupPicture.open(name, link);
}

const popupPlace = new PopupWithForm({
  popupSelector: '.pop-up_type_add',
  handleFormSubmit: handlePlaceFormSubmit});

const popupEdit = new PopupWithForm({
  popupSelector: '.pop-up_type_edit', 
  handleFormSubmit: handleProfileFormSubmit});

const popupPicture = new PopupWithImage('.pop-up_type_img');
  popupPicture.setEventListeners();

const userData = new UserInfo({ userNameEl: titleName, userInfoEl: subtitleName });

function openPopupEdit() {
  nameInput.value = userData.getUserInfo().profileName;
  jobInput.value = userData.getUserInfo().profileDescription;
  formValidators[ profileForm.getAttribute('name') ].resetValidation();
  popupEdit.open();
}

function openPopupAdd() {
  formValidators[ formPlaces.getAttribute('name') ].resetValidation();
  popupPlace.open();
}

function handleProfileFormSubmit() {
  userData.setUserInfo({
    profileName: nameInput.value,
    profileDescription: jobInput.value
  });
  popupEdit.close();
}

function createCard(el) {
  const card = new Card(el, '#elementTemplate', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

function handlePlaceFormSubmit() {
  const inputs = {
    name: inputEl.value,
    link: inputPlace.value,
  };

  const newCard = createCard(inputs);
  cardsList.addPrependItem(newCard);
  
  popupPlace.close();
}

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
      const card = createCard(item);
      cardsList.addItem(card);
  },
}, '.elements');

cardsList.renderedItems();

editBtn.addEventListener("click", openPopupEdit);
addBtn.addEventListener("click", openPopupAdd);

const formValidators = {}

const enableValidation = (configValidation) => {
  const formList = Array.from(document.querySelectorAll(configValidation.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, configValidation)
    const formName = formElement.getAttribute('name')

    formValidators[formName] = validator;
  validator.enableValidation();
  });
};

enableValidation(configValidation);