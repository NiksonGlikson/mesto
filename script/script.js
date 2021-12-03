const editBtn = document.querySelector('.profile__button-edit');
const addBtn = document.querySelector('.profile__button-add');
const formElement = document.querySelector('.pop-up__action');
const formPlaces = document.querySelector('.pop-up__action_place');
const nameInput = formElement.querySelector('.pop-up__input_profile_name');
const jobInput = formElement.querySelector('.pop-up__input_profile_description');
const titleName = document.querySelector('.profile__title');
const subtitleName = document.querySelector('.profile__subtitle');
const popupEdit = document.querySelector('.pop-up_type_edit');
const popupAdd = document.querySelector('.pop-up_type_add');
const popupImg = document.querySelector('.pop-up_type_img')
const closePopupEditBtn = popupEdit.querySelector('.pop-up__close-icon');
const closePopupAddBtn = popupAdd.querySelector('.pop-up__close-icon');
const closePopupImgBtn = popupImg.querySelector('.pop-up__close-icon');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('.element__template');
const addButtonEl = document.querySelector('.pop-up__submit-button_add');
const inputEl = document.querySelector('.pop-up__input_name');
const inputPlace = document.querySelector(".pop-up__input_place");
const initialCards = [
	{
	  name: 'Архыз',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
	  name: 'Челябинская область',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
	  name: 'Иваново',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
	  name: 'Камчатка',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
	  name: 'Холмогорский район',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
	  name: 'Байкал',
	  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
  ];

function openPopup(popup) {
	popup.classList.add('pop-up_opened');
}

function openPopupEdit() {
	openPopup(popupEdit);
	nameInput.value = titleName.textContent;
    jobInput.value = subtitleName.textContent;
}

function openPopupAdd() {
	openPopup(popupAdd);
	inputEl.value =  '';
	inputPlace.value = '';
}

function closePopup(popup) {
	popup.classList.remove('pop-up_opened');
}

closePopupEditBtn.addEventListener('click', () => {
	closePopup(popupEdit);
  });
  closePopupAddBtn.addEventListener('click', () => {
	closePopup(popupAdd);
  });


function formElementSubmitHandler(evt) {
    evt.preventDefault();
	titleName.textContent = nameInput.value;
    subtitleName.textContent = jobInput.value;
	closePopup(popupEdit)
}

function formPlaceSubmitHandler(evt) {
	evt.preventDefault();

	const InputText = inputEl.value;
	const InputImg = inputPlace.value;
    const listItem = getItem({name: InputText, link: InputImg});
    elements.prepend(listItem);

	closePopup(popupAdd);
}

  function render() {
	  const html = initialCards
	  .map((item, idx, arr) => {
		  return getItem(item);
	  });

	elements.append(...html);
  }

  function getItem(item) {
	const newItem = elementTemplate.content.cloneNode(true);
	const headerEl = newItem.querySelector('.element__title');
	const imgEl = newItem.querySelector('.element__img');
	headerEl.textContent = item.name;
	imgEl.src = item.link;
	imgEl.alt = item.name;

	const removeBtn = newItem.querySelector('.element__trash');
	removeBtn.addEventListener('click', handleDelete);

	imgEl.addEventListener('click', handlePopupImg);

	const likeBtn = newItem.querySelector('.element__like');
	likeBtn.addEventListener('click', handleLike);

	return newItem;
}

function handleLike(evt) {
	const targetLike = evt.target;
	targetLike.classList.toggle('element__like_type_black');
}

function handleDelete(evt) {
	const targetEl = evt.target;
	const listItem = targetEl.closest('.element');
	listItem.remove();
}

function handlePopupImg(evt) {
	const targetImg = evt.target;
	const elementImg = targetImg.closest('.element');
	const bigImg = popupImg.querySelector('.pop-up__image');
	const popupImgDescribe = document.querySelector('.pop-up__describe');

	popupImgDescribe.textContent = elementImg.textContent;
	bigImg.src = elementImg.querySelector('.element__img').src;
	bigImg.alt = elementImg.textContent;

	openPopup(popupImg);
}

closePopupImgBtn.addEventListener('click', () => {
	closePopup(popupImg);
});

formElement.addEventListener('submit', formElementSubmitHandler);
formPlaces.addEventListener('submit', formPlaceSubmitHandler);
editBtn.addEventListener('click', openPopupEdit);
addBtn.addEventListener('click', openPopupAdd);

render();