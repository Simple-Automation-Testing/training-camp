const { Page } = require("./page");
class TablesPage extends Page {
	static TITLE = `//h3[contains(text(),"Таблиці, Привіт")]`;

	constructor(page) {
		super(page);
	}
}

module.exports = { TablesPage };
