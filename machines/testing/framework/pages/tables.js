const { Page } = require("../../lib/base/pages/page");
const { Container, Button } = require("./../../lib/index");
const { step } = require("../../lib/report");
class TablesPage extends Page {
	static TITLE = `//h3[contains(text(),"Таблиці, Привіт")]`;
	static MENU_ADMIN_CABINET = `//button[text()="До адмін кабінету"]`;

	constructor() {
		super("Tables page");
		this.title = new Container(TablesPage.TITLE, "Title of table page", this.page);
		this.adminCabinet = new Button(TablesPage.MENU_ADMIN_CABINET, "Menu admin cabinet button", this.page);
	}

	@step((name) => `${name} executes getTitle`)
	async getTitle() {
		return await this.title.getText();
	}

	@step((name) => `${name} executes toAdminPage`)
	async toAdminPage() {
		await this.adminCabinet.click();
	}
}

module.exports = { TablesPage };
