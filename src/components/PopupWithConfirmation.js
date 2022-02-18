import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
	constructor(popupSelector) {
		super(popupSelector)
		this._form = this._popup.querySelector('.pop-up__form');
	}

	setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', () => {
			console.log('submit')
			if(this._handleFormSubmit) {
				this._handleFormSubmit();
			}
        })
    }

	setFormSubmitHandler(handler) {
		this._handleFormSubmit = handler;
	}
}