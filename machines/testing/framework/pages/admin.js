const { Page } = require("../../lib/base/pages/page");
const { Container, Button, Input } = require("../../lib/index");

class AdminPage extends Page {
	static TITLE = `//h3[contains(text(),"Кабінет адміністратора, Привіт")]`;
	static CREATE_USER_BUTTON = `//button[text()="Створити нового користувача"]`;
	static LIST_OF_USERS_BUTTON = `//button[text()="Список користувачів"]`;
	static USERNAME_FIELD = `//input[@placeholder="Ім'я користувача"]`;
	static NAME_FIELD = `//input[@placeholder="Ім'я"]`;
	static EMAIL_FIELD = `//input[@placeholder="Імейл"]`;
	static PASSWORD_FIELD = `//input[@placeholder="Пароль"]`;
	static CREATE_BUTTON = `(//button[text()="Створити нового користувача"])[2]`;
	static LIST_OF_USERS_DIV = `//div[@class="list"]`;
	static USER_NAME_ITEM = `//div[@class='user_item']/div[1]`;
	static USER_NAME_DETAILS = `//div[@class='user_item']/div[2]`;
	static IS_ADMIN_CHECKBOX = `//input[@type="checkbox"]`;
	static DETAIL_BUTTON = `//button[text()="Деталі"]`;

	constructor(page) {
		super(page);
		this.title = new Container(AdminPage.TITLE, "Title of admin page", page);
		this.createNewUserButton = new Button(AdminPage.CREATE_USER_BUTTON, "Create new user form button", page);
		this.listUsersButton = new Button(AdminPage.LIST_OF_USERS_BUTTON, "List existing users button", page);
		this.username = new Input(AdminPage.USERNAME_FIELD, "User name field", page);
		this.name = new Input(AdminPage.NAME_FIELD, "Name field", page);
		this.password = new Input(AdminPage.PASSWORD_FIELD, "Password field", page);
		this.email = new Input(AdminPage.EMAIL_FIELD, "Email field", page);
		this.password = new Input(AdminPage.PASSWORD_FIELD, "Password field", page);
		this.createNewUser = new Button(AdminPage.CREATE_BUTTON, "Create new user button", page);
		this.usersList = new Container(AdminPage.LIST_OF_USERS_DIV, "List of existing users", page);
		this.isAdmin = new Input(AdminPage.IS_ADMIN_CHECKBOX, "Checkbox is user admin", page);
	}

	async getTitle() {
		return await this.title.getText();
	}

	async createUser(options) {
		await this.createNewUserButton.click();
		await this.username.sendKeys(options.username);
		await this.name.sendKeys(options.name);
		await this.email.sendKeys(options.email);
		await this.password.sendKeys(options.password);
		if (options.isAdmin) {
			await this.isAdmin.click();
		}
		await this.createNewUser.click();
	}

	async isUserExistInArray(username) {
		await this.listUsersButton.click();
		const usernamesArray = await this.usersList.getArrayOfTextcontentFromListOfItems(AdminPage.USER_NAME_ITEM);
		return usernamesArray.includes(username);
	}
}

module.exports = {
	AdminPage,
};
