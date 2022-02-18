export default class Card {
	constructor({ data, id, handleCardClick, handleLikeClick, handleDelete }, elementSelector) {
		this._name = data.name;
		this._link = data.link;
		this._elementSelector = elementSelector;
		this.handleCardClick = handleCardClick;
		this.handleLikeClick = handleLikeClick;
		this.handleDelete = handleDelete;
        this._ownerId = data.owner._id;
        this._userId = id;
        this._likes = data.likes;
	}

_getLikesCount() {
	return this._likes.length
}

setLikes(newLikes) {
    this._likes = newLikes;
    if(this.isLiked()) {
      this._elementLikes.textContent = this._likes.length;
    } else {
      this._elementLikes.textContent = this._likes.length;
    }
    this._likeCard()
  }

  isLiked() {
      return !!this._likes.find(like => like._id === this._userId);
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
	this._elementImg = this._element.querySelector('.element__img');
	this._elementDelete = this._element.querySelector('.element__trash');
	this._elementLike = this._element.querySelector('.element__like');
	this._elementLikes = this._element.querySelector('.element__like-counter');

	if (this._ownerId === this._userId) {
		this._elementDelete.classList.add('element__trash_show')
	}

	if(this.isLiked()) {
		this._elementLike.classList.add('element__like_type_black');
	}

	this._elementImg.src = this._link;
	this._elementImg.alt = this._name;
	this._element.querySelector('.element__title').textContent = this._name;
	this._elementLikes.textContent = this._getLikesCount();
	this._setEventListeners();

	return this._element;
}

_setEventListeners() {
	this._element.querySelector('.element__trash').addEventListener('click', this.handleDelete);
	this._element.querySelector('.element__img').addEventListener('click', this.handleCardClick);
	this._element.querySelector('.element__like').addEventListener('click', this.handleLikeClick);
}

handleDeleteCard() {
	this._element.remove();
	this._element = null;
}

_likeCard() {
	this._element.querySelector('.element__like').classList.toggle('element__like_type_black');
}
}