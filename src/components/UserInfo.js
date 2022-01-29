export default class UserInfo {
	constructor({ userNameEl, userInfoEl }) {
		this._userNameEl = userNameEl;
		this._userInfoEl = userInfoEl;
	}

	getUserInfo() {
		return {
			profileName: this._userNameEl.textContent,
			profileDescription: this._userInfoEl.textContent
		};
	}

	setUserInfo({ profileName, profileDescription }) {
		this._userNameEl.textContent = profileName;
		this._userInfoEl.textContent = profileDescription;
	}
}