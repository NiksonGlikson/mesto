export default class UserInfo {
	constructor({ profileTitle, profileSubtitle, profileAvatar }) {
		this._userName = document.querySelector(profileTitle);
		this._userInfo = document.querySelector(profileSubtitle);
		this._avatar = document.querySelector(profileAvatar);
	}

	getUserInfo() {
		this._userData = {};
		this._userData.name = this._userName.textContent;
		this._userData.about = this._userInfo.textContent;
		return this._userData;
	}

	setUserInfo(data) {
		this._userName.textContent = data.name;
		this._userInfo.textContent = data.about;
	}

	setUserAvatar(data) {
		this._avatar.src = data.avatar;
	}
}	