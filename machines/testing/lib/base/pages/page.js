const { aggregator } = require("../../utils/aggregator");
class Page {
	constructor(name) {
		this.page = aggregator.getPage();
		this.__id = name;
	}

	async waitForTime(timeout) {
		await this.page.waitForTimeout(timeout);
	}
}

module.exports = { Page };
