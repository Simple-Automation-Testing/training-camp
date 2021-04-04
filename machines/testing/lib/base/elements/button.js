const { Element } = require("./element");

class Button extends Element {
	constructor(selector, name, page) {
		super(selector, name, page);
		this.__rootElement = null;
	}
}

module.exports = {
	Button,
};
