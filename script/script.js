const popUp = document.querySelector(".pop-up");
const popupOpen = document.querySelector(".profile__button-edit");
const popupClose = document.querySelector(".pop-up__close-icon");
let formElement = document.querySelector(".pop-up__action");
let nameInput = document.querySelector(".pop-up__input_profile_name");
let jobInput = document.querySelector(".pop-up__input_profile_description");
let titleName = document.querySelector(".profile__title");
let subtitleName = document.querySelector(".profile__subtitle");

function open() {
	popUp.classList.add("pop-up_opened");
}

function close() {
	popUp.classList.remove("pop-up_opened")
}

function formSubmitHandler (evt) {
    evt.preventDefault();

	titleName.textContent = nameInput.value;
	subtitleName.textContent = jobInput.value;

	close()
}

formElement.addEventListener('submit', formSubmitHandler);
popupOpen.addEventListener('click', open);
popupClose.addEventListener('click', close);