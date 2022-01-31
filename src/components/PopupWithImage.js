import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
	constructor(popupSelector) {
		super(popupSelector);
		this._popupImage = this._popup.querySelector('.pop-up__image');
		this._popupDescribe = this._popup.querySelector('.pop-up__describe');
	}

	open(name, link) {

		this._popupDescribe.textContent = name;
		this._popupImage.src = link;
		this._popupImage.alt = name;

		super.open();
	}
}