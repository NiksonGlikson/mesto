const showError = (form, input, errorMessageText, errorMessageClass, inputErrorClass) => {
	const errorMessage = form.querySelector(`#${input.id}-error`);
	errorMessage.textContent = errorMessageText;
	errorMessage.classList.add(errorMessageClass);
	input.classList.add(inputErrorClass);
}

const hideError = (form, input, errorMessageClass, inputErrorClass) => {
	const errorMessage = form.querySelector(`#${input.id}-error`);
	errorMessage.textContent = '';
	errorMessage.classList.remove(errorMessageClass);
	input.classList.remove(inputErrorClass);
}

const hasInvalidInput = (inputs) => {
	return Array.from(inputs).some((el) => !el.validity.valid);
}

const toggleButtonError = (inputs, button, inactiveButtonClass) => {
	if (hasInvalidInput(inputs)) {
		button.classList.add(inactiveButtonClass);
		button.disabled = true;
	} else {
		button.classList.remove(inactiveButtonClass);
		button.disabled = false;
	}
}

const checkifInputValid = (form, input, { inputErrorClass, errorClass }) => {
	if (!input.validity.valid) {
		showError(form, input, input.validationMessage, errorClass, inputErrorClass);
	} else {
		hideError(form, input, errorClass, inputErrorClass);
	}
}

const setInputListeners = (form, { inputSelector, inactiveButtonClass, submitButtonSelector, ...rest }) => {
	const inputs = form.querySelectorAll(inputSelector);
	const submitButton = form.querySelector(submitButtonSelector);
	inputs.forEach((input) => {
		input.addEventListener('input', () => {
			checkifInputValid(form, input, rest);
			toggleButtonError(inputs, submitButton, inactiveButtonClass);
		});
	});
}

const enableValidation = ({ formSelector, ...rest }) => {
	const forms = document.querySelectorAll(formSelector);

	forms.forEach((form) => {
		form.addEventListener('submit', (evt) => {
			evt.preventDefault();
		});

		setInputListeners(form, rest);
	});
}

enableValidation({
	formSelector: '.pop-up__action',
	inputSelector: '.pop-up__input',
	submitButtonSelector: '.pop-up__submit-button',
	inactiveButtonClass: 'pop-up__submit-button_disabled',
	inputErrorClass: 'pop-up__input_type_error',
	errorClass: 'popup__error_visible'
});
