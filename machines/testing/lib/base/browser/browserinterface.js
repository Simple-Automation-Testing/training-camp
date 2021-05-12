const playwright = require("playwright");
const { step, attachScreenshot, attachJsonData } = require("../../report");
const { currentTime } = require("../../utils/currenttime");
const { aggregator } = require("../../utils/aggregator");
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
	@step(`Browser closed`)
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

	@step("Attach fail condition")
	async attachAllureScreenshot(name = "Screenshot") {
		const png = await this.createScreenshot();
		const url = await this.getCurrentUrl();
		const lsData = await this.page.evaluate(() => window.localStorage);
		await attachJsonData("Current local storage data", JSON.stringify(lsData));
		await attachScreenshot(`${(name = "Screenshot")} current url: ${url}`, png);
	}
}

const browserInterface = new Browser();

module.exports = { browserInterface };
