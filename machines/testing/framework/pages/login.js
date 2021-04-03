const {Element } = require('../../lib/index')

class LoginPage {
	static LOGIN_URL = `http://localhost:8081/`;
	static LOGIN_FORM_USER_NAME_FIELD = `//input[@placeholder="Ім'я користувача"]`;
	static LOGIN_FORM_PASSWORD_FIELD = `//input[@placeholder="пароль"]`;
	static LOGIN_FORM_SIGN_IN_BUTTON = `(//button[text()="Увійти"])[2]`;
	static MENU_SIGN_IN = `(//button[text()="Увійти"])[1]`;
	static MENU_REGISTER = `//button[text()="Зареєструватися"]`;
	static CHECKIN_FORM_USERNAME_FIELD = `//input[@placeholder="Ім'я користувача"]`;
	static CHECKIN_FORM_NAME_FIELD = `//input[@placeholder="Ім'я"]`;
	static CHECKIN_FORM_EMAIL_FIELD = `//input[@placeholder="Імейл"]`;
	static CHECKIN_FORM_PASSWORD_FIELD = `//input[@placeholder="пароль"]`;
	static CHECKIN_FORM_REGISTER_BUTTON = `(//button[text()="Зареєструватися"])[2]`;

	constructor(page) {
		this.page = page;
		this.username = new Element(LoginPage.LOGIN_FORM_USER_NAME_FIELD, 'User name field', page)
		this.password = new Element(LoginPage.LOGIN_FORM_PASSWORD_FIELD, 'Password field', page)
		this.signin = new Element(LoginPage.LOGIN_FORM_SIGN_IN_BUTTON, 'Sign in button', page)
	}

	async switchTo(modalName) {
		await this.page.goto(LoginPage.LOGIN_URL);
		switch (modalName) {
			case "checkin":
				await (await this.page.$(LoginPage.MENU_REGISTER)).click();
				break;
			case "login":
				await (await this.page.$(LoginPage.MENU_SIGN_IN)).click();
				break;
			default:
				console.log(`Sorry, no such modal: ${modalName}`);
		}
	}

	async checkIn(options) {
		await this.page.fill(
			LoginPage.CHECKIN_FORM_USERNAME_FIELD,
			options.username
		);
		await this.page.fill(LoginPage.CHECKIN_FORM_NAME_FIELD, options.name);
		await this.page.fill(LoginPage.CHECKIN_FORM_EMAIL_FIELD, options.email);
		await this.page.fill(
			LoginPage.CHECKIN_FORM_PASSWORD_FIELD,
			options.password
		);
		await (await this.page.$(LoginPage.CHECKIN_FORM_REGISTER_BUTTON)).click();
	}

	async login({ name, password }) {
		await this.username.sendKeys(name)
		await this.password.sendKeys(password)
		await this.signin.click()
	}
}

module.exports = { LoginPage };
