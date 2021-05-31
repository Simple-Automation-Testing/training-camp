const { Page } = require("../../lib/base/pages/page");
const { Input, Button } = require("../../lib/index");
const { step } = require("../../lib/report");

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

	constructor() {
		super("Login page");
		this.menuSignin = this.initElement(Button, LoginPage.MENU_SIGNIN, "Menu signin button");
		this.menuCheckin = this.initElement(Button, LoginPage.MENU_CHECKIN, "Menu checkin button");
		this.username = this.initElement(Input, LoginPage.USERNAME_FIELD, "User name field");
		this.name = this.initElement(Input, LoginPage.NAME_FIELD, "Name field");
		this.password = this.initElement(Input, LoginPage.PASSWORD_FIELD, "Password field");
		this.signin = this.initElement(Button, LoginPage.SIGNIN_BUTTON, "Signin button");
		this.email = this.initElement(Input, LoginPage.EMAIL_FIELD, "Email field");
		this.checkin = this.initElement(Button, LoginPage.CHECKIN_BUTTON, "Checkin button");
	}

	@step(`Open login page`)
	async open() {
		await this.page.goto(LoginPage.LOGIN_URL);
	}

	@step(`Switch between modal login forms`)
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

	@step(`Check in`)
	async checkIn(options) {
		await this.username.sendKeys(options.username);
		await this.name.sendKeys(options.name);
		await this.email.sendKeys(options.email);
		await this.password.sendKeys(options.password);
		await this.checkin.click();
	}

	@step(`Login`)
	async login(options) {
		await this.username.sendKeys(options.name);
		await this.password.sendKeys(options.password);
		await this.signin.click();
	}
}

module.exports = { LoginPage };
