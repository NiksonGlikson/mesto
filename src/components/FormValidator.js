export default class FormValidator {
  constructor(form, configValidation) {
    this._form = form;
    this._inputSelector = configValidation.inputSelector;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(configValidation.submitButtonSelector);
    this._inactiveButtonClass = configValidation.inactiveButtonClass;
    this._inputErrorClass = configValidation.inputErrorClass;
    this._errorClass = configValidation.errorClass;
  }

  // Функция добавления класса с ошибкой
  _showError(input, errorMessageText) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = errorMessageText;
    errorMessage.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

// Функция скрытия класса с ошибкой
  _hideError(input) {
    const errorMessage = this._form.querySelector(`#${input.id}-error`);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  // Функция проверки массива полей на валидность
  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  }

  // Функция переключения кнопки
  _toggleButtonError() {
    if (this._hasInvalidInput(this._inputSelector)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      console.log(this._submitButton);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  }

  _checkifInputValid(input) {
    if (!input.validity.valid) {
      this._showError(input, input.validationMessage);
    } else {
      this._hideError(input);
    }
  }

  // Функция добавления обработчиков всем полям
  _setInputListeners() {
    this._toggleButtonError();
    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkifInputValid(input);
        this._toggleButtonError();
      });
    });
  }

  resetValidation() {
    this._toggleButtonError();
    this._inputList.forEach((input) => {
      this._hideError(input);
    });
  }

  enableValidation() {
    this._setInputListeners();
  }
}
