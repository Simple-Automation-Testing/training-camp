const playwright = require("playwright");
const { step } = require("../../report");
const { attachScreenshot, attachJsonData } = require("../../report/allure");
const { attachSpecJsonData } = require("../../report/spec");
const { currentTime } = require("../../utils/currenttime");
const { aggregator } = require("../../utils/aggregator");
const { REPORTER } = process.env;
class Browser {
	constructor() {
		this.instance = null;
		this.context = null;
		this.page = null;
	}

	/**
	 * @public
	 */
	@step(`Init Browser, Context, Page`)
	async initBrowser(browser, options = {}) {
		if (browser in playwright) {
			this.instance = await playwright[browser].launch(options);
			this.__id = browser;
			this.context = await this.instance.newContext();
			await this.context.storageState();
			this.page = await this.context.newPage();
		}
		aggregator.setPage(this.page);
		return this.page;
	}

	/**
	 * @public
	 */
	@step((name) => `Browser ${name} closed`)
	async closeBrowser() {
		await this.instance.close();
	}

	/**
	 * @public
	 */
	async createScreenshot() {
		return await this.page.screenshot({ path: `./testing/allure/screenshots/screen-${await currentTime()}.png`, fullPage: true });
	}

	/**
	 * @public
	 */
	async getCurrentUrl() {
		return await this.page.url();
	}

	@step("ATTACH FAIL CONDITION:") // вынести в репортинг
	async attachFailConditions(name = "Screenshot") {
		const png = await this.createScreenshot();
		const url = await this.getCurrentUrl();
		const lsData = await this.page.evaluate(() => window.localStorage);
		if (REPORTER == "ALLURE") {
			await attachJsonData("Current local storage data", JSON.stringify(lsData, null, 2));
			await attachScreenshot(`${(name = "Screenshot")} current url: ${url}`, png);
		}
		if (REPORTER == "SPEC") {
			//await attachSpecJsonData("Current local storage data", lsData);
			console.log(`\tError current url: \n\t${url}`);
		}
	}
}

const browserInterface = new Browser();

module.exports = { browserInterface };
