import "./index.css";
import { configValidation } from "../utils/configValidation.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

import { 
  cardsTemplateSelector,
  initialElementSelector, 
  editPopupBtn, 
  profileAvatarBtn, 
  profileTitle, 
  profileSubtitle, 
  profileAvatar, 
  editPopup, 
  addCardPopup, 
  imagePopup, 
  deletePopup, 
  avatarPopup, 
  addBtn,
  nameInput,
  jobInput } from "../utils/constants.js";

const api = new Api({
  urlAdress: 'https://mesto.nomoreparties.co/v1/cohort-35',
  token: '8f16ac3a-0753-4a70-b9e1-5f31aba6605c',
  'Content-Type': 'application/json'
})

Promise.all([ api.getUserInfo(), api.getInitialCards() ])
  .then(([newUserData, cards]) => {
    const data = newUserData;
    const item = cards;

const popupDelete = new PopupWithConfirmation(deletePopup);
popupDelete.setEventListeners();

const renderCard = item => {
  const card = new Card({
    data: item,
    id: data._id,
    handleCardClick: () => {
      popupPicture.open(item);
    },
    handleLikeClick: () => {
      const isLiked = card.isLiked();
      if(isLiked) {
        api.removeLikeCard(item._id)
        .then(item => card.setLikes(item.likes))
        .catch((err) => {
          console.log(err)
        })
      } else {
        api.handleLike(item._id)
        .then(item => card.setLikes(item.likes))
        .catch((err) => {
          console.log(err)
        })
      }
    },
    handleDelete: () => {
      popupDelete.open();
      popupDelete.setFormSubmitHandler(() => {
        api.handleDelete(item._id)
        .then(() => {
          card.handleDeleteCard();
          popupDelete.close();
        })
        .catch((err) => {
          console.log(err)
        })
      })
    },
  }, cardsTemplateSelector);

  return card;
}

const renderCards = item => {
  const card = renderCard(item);
  cardsList.addItem(card.generateCard());
}

const renderNewCard = item => {
  const card = renderCard(item);
  cardsList.addPrependItem(card.generateCard());
}

const cardsList = new Section({
  items: item,
  renderer: renderCards,
}, initialElementSelector);

cardsList.renderItems();

const addCard = new PopupWithForm({
  popupSelector: addCardPopup,
  handleFormSubmit: (item) => {
    renderLoading(true, addCardPopup);
    const data = {
      name: item.name,
      link: item.place
    }
    api.createCard(data)
    .then((item) => {
      renderNewCard(item)
    })
    .then(() => {
      addCard.close();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => renderLoading(false, addCardPopup))
  }
})

addCard.setEventListeners();
addBtn.addEventListener('click', () => addCard.open());

const userData = new UserInfo({ profileTitle, profileSubtitle, profileAvatar });
userData.setUserInfo(data);
userData.setUserAvatar(data);

const editProfile = new PopupWithForm({
  popupSelector: editPopup,
  handleFormSubmit: (data) => {
    renderLoading(true, editPopup)
    api.editUserInfo(data.name, data.about)
    .then(() => {
      userData.setUserInfo(data)
    })
    .then(() => {
      editProfile.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => renderLoading(false, editPopup))
  }
});

editProfile.setEventListeners();

editPopupBtn.addEventListener('click', () => {
  const profileInfo = userData.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  editProfile.open();
});


const popupPicture = new PopupWithImage(imagePopup);
popupPicture.setEventListeners();

const popupAvatar = new PopupWithForm({
  popupSelector: avatarPopup,
  handleFormSubmit: (data) => {
    renderLoading(true, avatarPopup)
    api.editUserAvatar(data.avatar)
    .then(() => {
      userData.setUserAvatar(data);
    })
    .then(() => {
      popupAvatar.close()
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => renderLoading(false, avatarPopup))
  }
});

popupAvatar.setEventListeners();
profileAvatarBtn.addEventListener('click', () => popupAvatar.open())

})

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

const renderLoading = (loading, popupSelector) => {
  const actPopup = document.querySelector(popupSelector);
  const loadingBtn = actPopup.querySelector('.pop-up__submit-button');

  loadingBtn.textContent = loading 
  ? 'Сохраняется...' 
  : 'Сохранить';
}
