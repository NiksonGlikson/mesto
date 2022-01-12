const bigImg = document.querySelector(".pop-up__image");
const popupImgDescribe = document.querySelector(".pop-up__describe");
const popupImg = document.querySelector(".pop-up_type_img");

export default class Card {
	constructor(data, elementSelector, openPopupHandler) {
		this._name = data.name;
		this._link = data.link;
		this._elementSelector = elementSelector;
		this._openPopupHandler = openPopupHandler;
	}

_getTemplate() {
	const cardElement = document.querySelector(this._elementSelector)
	.content
	.querySelector('.element')
	.cloneNode(true)
	return cardElement;
}

generateCard() {
	this._element = this._getTemplate();
	const elementImg = this._element.querySelector('.element__img');
	elementImg.src = this._link;
	elementImg.alt = this._name;
	this._element.querySelector('.element__title').textContent = this._name;
	this._setEventListeners();

	return this._element;
}

_handlePopupImgClick = () => {
	bigImg.src = this._link;
	bigImg.alt = this._name;
	popupImgDescribe.textContent = this._name;
	this._openPopupHandler(popupImg);
}

_handleDelete = () => {
	this._element.remove();
}

_handleLike = () => {
	this._targetLike = this._element.querySelector('.element__like');
	this._targetLike.classList.toggle('element__like_type_black');
}

_setEventListeners() {

	const imgEl = this._element.querySelector('.element__img');
	imgEl.addEventListener('click', this._handlePopupImgClick);

	const removeBtn = this._element.querySelector('.element__trash');
	removeBtn.addEventListener('click', this._handleDelete);

	const likeBtn = this._element.querySelector('.element__like');
	likeBtn.addEventListener('click', this._handleLike);
}
}