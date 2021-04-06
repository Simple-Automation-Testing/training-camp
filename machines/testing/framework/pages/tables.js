const { Page } = require("../../lib/base/pages/page");
const { Container } = require("./../../lib/index");
class TablesPage extends Page {
	static TITLE = `//h3[contains(text(),"Таблиці, Привіт")]`;

	constructor(page) {
		super(page);
		this.title = new Container(TablesPage.TITLE, "Title of table page", page);
	}

	async getTitle() {
		return await this.title.getText();
	}
}

module.exports = { TablesPage };
