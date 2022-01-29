export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._handleEsc = this._handleEsc.bind(this);
	}

	open() {
		this._popup.classList.add("pop-up_opened");
  		document.addEventListener("keydown", this._handleEsc);
		this.setEventListeners();
	}	

	close() {
		this._popup.classList.remove("pop-up_opened");
  		document.removeEventListener("keydown", this._handleEsc);
	}

	_handleEsc(evt) {
		if (evt.key === "Escape" || evt.key === "Esc") {
			const activePopup = document.querySelector(".pop-up_opened");
			this.close(activePopup);
		  }
	}

	setEventListeners() {
        this._overlay = this._popup.querySelector(".pop-up__overlay");
        this._overlay.addEventListener('click', () => {
            this.close();
        });
        this._closeButton = this._popup.querySelector(".pop-up__close-icon");
        this._closeButton.addEventListener('click', () => {
            this.close();
        })
    }
}