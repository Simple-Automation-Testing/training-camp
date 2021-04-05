const { Element } = require("./element");

class Container extends Element {
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
	 */
	async getText() {
		await this._initRootElement();
		return await this.__rootElement.textContent();
	}

	/**
	 * @public
	 */
	async getArrayOfTextcontentFromListOfItems(singleItemLocator) {
		await this._initRootElement();
		return await this.__rootElement.$$eval(singleItemLocator, (nodes) => {
			return nodes.map((item) => {
				return item.innerText.trim();
			});
		});
	}
}

module.exports = {
	Container,
};
