const { aggregator } = require("../../utils/aggregator");
class Page {
	constructor(name) {
		this.page = aggregator.getPage();
		this.__id = name;
	}

	async waitForTime(timeout) {
		await this.page.waitForTimeout(timeout);
	}

	initElement(elementClass, selector, selectorName) {
		return new elementClass(selector, selectorName, this.page);
	}
}

module.exports = { Page };
