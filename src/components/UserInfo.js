export default class UserInfo {
	constructor({ profileTitleSelector, profileSubtitleSelector, profileAvatarSelector }) {
		this._userName = document.querySelector(profileTitleSelector);
		this._userInfo = document.querySelector(profileSubtitleSelector);
		this._avatar = document.querySelector(profileAvatarSelector);
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