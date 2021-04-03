/**
 * @info we build wrapper around element handler
 * but always remember that this library can be updated/replaced
 * @see https://playwright.dev/docs/api/class-elementhandle
 */

class Element {
	/**
	 * @param {string} selector - an element selector
	 * @param {string} name - an element name
	 * @param {Object<Page>} page - any page of class that extends class Page
	 */
	constructor(selector, name, page) {
		this.__rootSelector = selector;
		this.__id = name;
		this.__page = page;
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
	async click() {
		await this._initRootElement();
		await this.__rootElement.click();
	}

	/**
	 * @public
	 * @param {string} [options = {}] keys - a text to type into a rootElement, options - optional parameter
	 */
	async sendKeys(...keys) {
		await this._initRootElement();
		await this.__rootElement.type(...keys);
	}
}

module.exports = {
	Element,
};
