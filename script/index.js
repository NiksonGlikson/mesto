import { configValidation } from "../utils/configValidation.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editBtn = document.querySelector(".profile__button-edit");
const addBtn = document.querySelector(".profile__button-add");
const profileForm = document.querySelector(".pop-up__form");
const formPlaces = document.querySelector(".pop-up__form_place");
const nameInput = profileForm.querySelector(".pop-up__input_profile_name");
const jobInput = profileForm.querySelector(".pop-up__input_profile_description");
const titleName = document.querySelector(".profile__title");
const subtitleName = document.querySelector(".profile__subtitle");
const popupEdit = document.querySelector(".pop-up_type_edit");
const popupAdd = document.querySelector(".pop-up_type_add");
const popupImg = document.querySelector(".pop-up_type_img");
const closePopupImgBtn = popupImg.querySelector(".pop-up__close-icon");
const elements = document.querySelector(".elements");
const inputEl = document.querySelector(".pop-up__input_name");
const inputPlace = document.querySelector(".pop-up__input_place");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopup(popup) {
  popup.classList.add("pop-up_opened");
  document.addEventListener("keydown", handleEsc);
}

function openPopupEdit() {
    nameInput.value = titleName.textContent;
    jobInput.value = subtitleName.textContent;
    formValidators[ profileForm.getAttribute('name') ].resetValidation()
  openPopup(popupEdit);
}

function openPopupAdd() {
  formValidators[ formPlaces.getAttribute('name') ].resetValidation()
  openPopup(popupAdd);
}

function closePopup(popup) {
  popup.classList.remove("pop-up_opened");
  document.removeEventListener("keydown", handleEsc);
}

const popups = document.querySelectorAll('.pop-up')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('pop-up__close-icon')) {
          closePopup(popup)
        }
        if (evt.target.classList.contains('pop-up__overlay')) {
          closePopup(popup)
        }
    })
})

function handleEsc(evt) {
  if (evt.key === "Escape" || evt.key === "Esc") {
    const activePopup = document.querySelector(".pop-up_opened");
    closePopup(activePopup);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  subtitleName.textContent = jobInput.value;
  closePopup(popupEdit);
}

function createCard(el) {
  const card = new Card(el, "#elementTemplate", openPopup);
  const cardElement = card.generateCard();
  return cardElement;
}

function handlePlaceFormSubmit(e) {
  const inputs = {
    name: inputEl.value,
    link: inputPlace.value,
  };

  const newCard = createCard(inputs);
  elements.prepend(newCard);
  e.preventDefault(); 
  e.target.reset(); 

  closePopup(popupAdd);
}

initialCards.forEach((item) => {
  const card = createCard(item);
  elements.append(card);
});

closePopupImgBtn.addEventListener("click", () => {
  closePopup(popupImg);
});

profileForm.addEventListener("submit", handleProfileFormSubmit);
formPlaces.addEventListener("submit", handlePlaceFormSubmit);
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