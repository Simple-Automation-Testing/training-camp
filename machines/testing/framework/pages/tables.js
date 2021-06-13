const { Page } = require("../../lib/base/pages/page");
const { Container, Button, Input } = require("./../../lib/index");
const { step } = require("../../lib/report");
class TablesPage extends Page {
	static TITLE = `//h3[contains(text(),"Таблиці, Привіт")]`;
	static MENU_ADMIN_CABINET = `//button[text()="До адмін кабінету"]`;
	static PRODUCER_ADD = `(//input[@placeholder="Виробник"])[2]`;
	static VOLUME_ADD = `(//input[@placeholder="Робочий об'єм"])[2]`;
	static LENGTH_ADD = `//input[@placeholder="Довжина"]`;
	static WIDTH_ADD = `//input[@placeholder="Ширина"]`;
	static WEIGHT_ADD = `//input[@placeholder="Маса"]`;
	static POWER_ADD = `//input[@placeholder="Потужність трактора"]`;
	static PRICE_ADD = `(//input[@placeholder="Ціна"])[2]`;
	static ADD_BUTTON = `//button[text()="Додати"]`;
	static PRODUCER_FILTER = `(//input[@placeholder="Виробник"])[1]`;
	static VOLUME_FILTER = `(//input[@placeholder="Робочий об'єм"])[1]`;
	static PRICE_FILTER = `(//input[@placeholder="Ціна"])[1]`;
	static FILTER_BUTTON = `//button[text()="Фільтрувати"]`;
	static LOGOUT_BUTTON = `//button[text()="Вийти"]`;
	static LIST_OF_MACHINES_TABLE = `//table[contains(@class,"machines_list")]/tbody`;
	static PRODUCER_CELL_IN_ROW = `//tr/td[contains(@class,"brand")]/span`;

	constructor() {
		super("Tables page");
		this.title = this.initElement(Container, TablesPage.TITLE, "Title of table page");
		this.adminCabinet = this.initElement(Button, TablesPage.MENU_ADMIN_CABINET, "Menu admin cabinet button");
		this.addProducer = this.initElement(Input, TablesPage.PRODUCER_ADD, "Add producer field");
		this.addVolume = this.initElement(Input, TablesPage.VOLUME_ADD, "Add volume field");
		this.addLength = this.initElement(Input, TablesPage.LENGTH_ADD, "Add length field");
		this.addWidth = this.initElement(Input, TablesPage.WIDTH_ADD, "Add width field");
		this.addWeight = this.initElement(Input, TablesPage.WEIGHT_ADD, "Add weight field");
		this.addPower = this.initElement(Input, TablesPage.POWER_ADD, "Add power field");
		this.addPrice = this.initElement(Input, TablesPage.PRICE_ADD, "Add price field");
		this.addMachine = this.initElement(Button, TablesPage.ADD_BUTTON, "Add machine button");
		this.filterProducer = this.initElement(Input, TablesPage.PRODUCER_FILTER, "Search producer field");
		this.filterVolume = this.initElement(Input, TablesPage.VOLUME_FILTER, "Search volume field");
		this.filterPrice = this.initElement(Input, TablesPage.PRICE_FILTER, "Search price field");
		this.filterMachine = this.initElement(Button, TablesPage.FILTER_BUTTON, "Filter machine button");
		this.exit = this.initElement(Button, TablesPage.LOGOUT_BUTTON, "Logout button");
		this.machinesTable = this.initElement(Container, TablesPage.LIST_OF_MACHINES_TABLE, "Table of machines");
	}

	@step((name) => `${name} executes getTitle`)
	async getTitle() {
		return await this.title.getText();
	}

	@step((name) => `${name} executes toAdminPage`)
	async toAdminPage() {
		await this.adminCabinet.click();
	}

	@step((name) => `${name} executes scrollToDown`)
	async scrollToDown() {
		await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
	}

	@step((name) => `${name} executes addMachine`)
	async addNewMachine(options) {
		await this.addProducer.sendKeys(options.mProducer);
		await this.addVolume.sendKeys(options.mVolume);
		await this.addLength.sendKeys(options.mLength);
		await this.addWidth.sendKeys(options.mWidth);
		await this.addWeight.sendKeys(options.mWeight);
		await this.addPower.sendKeys(options.mPower);
		await this.addPrice.sendKeys(options.mPrice);
		await this.addMachine.click();
	}

	@step((name) => `${name} executes filterExisitngMachine`)
	async filterExisitngMachine(options) {
		await this.filterProducer.sendKeys(options.mProducer);
		await this.filterVolume.sendKeys(options.mVolume);
		await this.filterPrice.sendKeys(options.mPrice);
		await this.filterMachine.click();
	}

	@step((name) => `${name} logout`)
	async logout() {
		await this.exit.click();
	}

	@step((name) => `${name} check isMachineExistInArray`)
	async isMachineExistInArray(producer) {
		if (TablesPage.PRODUCER_CELL_IN_ROW) {
			const producersArray = await this.machinesTable.getArrayOfTextcontentFromListOfItems(TablesPage.PRODUCER_CELL_IN_ROW);
			return producersArray.includes(producer);
		}
		return false;
	}
}

module.exports = { TablesPage };
