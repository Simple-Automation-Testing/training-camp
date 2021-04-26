const { chromium, firefox, webkit } = require("playwright");
const { step, attachScreenshot, attachJsonData } = require("../../report");
const { currentTime } = require("../../utils/currenttime");

class Browser {
	/**
	 * @public
	 */
	//@step(`Browser created`)
	async initBrowser(browser, options) {
		switch (browser) {
			case "chromium":
				return await chromium.launch(options);
				break;
			case "firefox":
				return await firefox.launch(options);
				break;
			case "webkit":
				return await webkit.launch(options);
				break;
			case "ffmpeg":
				return await ffmpeg.launch(options);
				break;
			default:
				throw new Error(`There is no such ${browser}`);
		}
	}

	@step(`Browser closed`)
	async closeBrowser(browser) {
		await browser.close();
	}

	/**
	 * @public
	 */
	//@step("Browser create new browser context")
	async createNewContext(browser) {
		this.context = await browser.newContext();
		return this.context;
	}

	/**
	 * @public
	 */
	//@step("Context creates newPage")
	async createNewPage(context) {
		this.page = await context.newPage();
		return this.page;
	}

	/**
	 * @public
	 */
	async setStorage(context) {
		await context.storageState();
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
