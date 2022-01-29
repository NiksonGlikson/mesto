const bigImg = document.querySelector(".pop-up__image");
const popupImgDescribe = document.querySelector(".pop-up__describe");
const popupImg = document.querySelector(".pop-up_type_img");

export default class Card {
	constructor(data, elementSelector, handleCardClick) {
		this._name = data.name;
		this._link = data.link;
		this._elementSelector = elementSelector;
		this._handleCardClick = handleCardClick;
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
	this._targetLike = this._element.querySelector('.element__like');
	this._elementImg = this._element.querySelector('.element__img');
	this._elementImg.src = this._link;
	this._elementImg.alt = this._name;
	this._element.querySelector('.element__title').textContent = this._name;
	this._setEventListeners();

	return this._element;
}

_handleDelete = () => {
	this._element.remove();
}

_handleLike = () => {
	this._targetLike.classList.toggle('element__like_type_black');
}

_setEventListeners() {
	this._elementImg.addEventListener('click', () => {
		this._handleCardClick(this._name, this._link);
	});

	this._removeBtn = this._element.querySelector('.element__trash');
	this._removeBtn.addEventListener('click', this._handleDelete);

	this._targetLike.addEventListener('click', this._handleLike);
}
}