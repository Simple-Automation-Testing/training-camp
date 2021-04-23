const { Element } = require("./element");
const { step } = require("../../report");

class Input extends Element {
	constructor(selector, name, page) {
		super(selector, name, page);
		this.__rootElement = null;
	}

	/**
	 * @private
	 */
	async _initRootElement() {
		this.__rootElement = await this.__page.$(this.__rootSelector);
	}

	/**
	 * @public
	 * @param {string} [options = {}] keys - a text to type into a rootElement, options - optional parameter
	 */

	@step((name) => `${name} executes sendKeys`)
	async sendKeys(...keys) {
		await this._initRootElement();
		await this.__rootElement.type(...keys);
	}

	@step((name) => `${name} executes isCheckboxChecked`)
	async isCheckboxChecked() {
		await this._initRootElement();
		return await this.__rootElement.isChecked();
	}
}

module.exports = {
	Input,
};
