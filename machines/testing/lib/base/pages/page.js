const { aggregator } = require("../../utils/aggregator");
class Page {
	constructor(name) {
		this.page = aggregator.getPage();
		this.__id = name;
	}
}

module.exports = { Page };
