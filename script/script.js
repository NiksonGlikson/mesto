const popUp = document.querySelector(".pop-up");
const popupOpen = document.querySelector(".profile__button-edit");
const popupClose = document.querySelector(".pop-up__close-icon");

function open() {
	popUp.classList.add("pop-up_opened");
}

function close() {
	popUp.classList.remove("pop-up_opened")
}

popupOpen.addEventListener('click', open);
popupClose.addEventListener('click', close);

let formElement = document.querySelector(".pop-up__action");
let nameInput = document.querySelector(".pop-up__profile-name");
let jobInput = document.querySelector(".pop-up__profile-description");
let titleName = document.querySelector(".profile__title");
let subtitleName = document.querySelector(".profile__subtitle");


function formSubmitHandler (evt) {
    evt.preventDefault();

	let nameInputValue = nameInput.value
	let jobInputValue = jobInput.value

	titleName.textContent = nameInputValue;
	subtitleName.textContent = jobInputValue;

	close()
}

formElement.addEventListener('submit', formSubmitHandler);