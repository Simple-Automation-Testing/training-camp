const { Page } = require("../../lib/base/pages/page");
const { Container } = require("../../lib/index");

class AdminPage extends Page {
	static TITLE = `//h3[contains(text(),"Кабінет адміністратора, Привіт")]`;

	constructor(page) {
		super(page);
		this.title = new Container(AdminPage.TITLE, "Title of admin page", page);
	}

	async getTitle() {
		return await this.title.getText();
	}
}

module.exports = {
	AdminPage,
};
