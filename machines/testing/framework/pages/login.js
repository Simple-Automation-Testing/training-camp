const { Page } = require("../../lib/base/pages/page");
const { Input, Button } = require("../../lib/index");

class LoginPage extends Page {
	static LOGIN_URL = `http://localhost:8081/`;
	static USERNAME_FIELD = `//input[@placeholder="Ім'я користувача"]`;
	static PASSWORD_FIELD = `//input[@placeholder="пароль"]`;
	static SIGNIN_BUTTON = `(//button[text()="Увійти"])[2]`;
	static MENU_SIGNIN = `(//button[text()="Увійти"])[1]`;
	static MENU_CHECKIN = `//button[text()="Зареєструватися"]`;
	static NAME_FIELD = `//input[@placeholder="Ім'я"]`;
	static EMAIL_FIELD = `//input[@placeholder="Імейл"]`;
	static CHECKIN_BUTTON = `(//button[text()="Зареєструватися"])[2]`;

	constructor(page) {
		super(page);
		this.menuSignin = new Button(LoginPage.MENU_SIGNIN, "Menu signin button", page);
		this.menuCheckin = new Button(LoginPage.MENU_CHECKIN, "Menu checkin button", page);
		this.username = new Input(LoginPage.USERNAME_FIELD, "User name field", page);
		this.name = new Input(LoginPage.NAME_FIELD, "Name field", page);
		this.password = new Input(LoginPage.PASSWORD_FIELD, "Password field", page);
		this.signin = new Button(LoginPage.SIGNIN_BUTTON, "Signin button", page);
		this.email = new Input(LoginPage.EMAIL_FIELD, "Email field", page);
		this.checkin = new Button(LoginPage.CHECKIN_BUTTON, "Checkin button", page);
	}

	async open() {
		await this.page.goto(LoginPage.LOGIN_URL);
	}

	async switchTo(modalName) {
		switch (modalName) {
			case "checkin":
				await this.menuCheckin.click();
				break;
			case "login":
				await this.menuSignin.click();
				break;
			default:
				console.log(`Sorry, no such modal: ${modalName}`);
		}
	}

	async checkIn(options) {
		await this.username.sendKeys(options.username);
		await this.name.sendKeys(options.name);
		await this.email.sendKeys(options.email);
		await this.password.sendKeys(options.password);
		await this.checkin.click();
	}

	async login(options) {
		await this.username.sendKeys(options.name);
		await this.password.sendKeys(options.password);
		await this.signin.click();
	}
}

module.exports = { LoginPage };
