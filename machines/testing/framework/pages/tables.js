const { Page } = require("../../lib/base/pages/page");
const { Container, Button } = require("./../../lib/index");
class TablesPage extends Page {
	static TITLE = `//h3[contains(text(),"Таблиці, Привіт")]`;
	static MENU_ADMIN_CABINET = `//button[text()="До адмін кабінету"]`;

	constructor(page) {
		super(page);
		this.title = new Container(TablesPage.TITLE, "Title of table page", page);
		this.adminCabinet = new Button(TablesPage.MENU_ADMIN_CABINET, "Menu admin cabinet button", page);
	}

	async getTitle() {
		return await this.title.getText();
	}

	async toAdminPage() {
		await this.adminCabinet.click();
	}
}

module.exports = { TablesPage };
