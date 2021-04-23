/**
 * @info we build wrapper around element handler
 * but always remember that this library can be updated/replaced
 * @see https://playwright.dev/docs/api/class-elementhandle
 */

const { step } = require("../../report");

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
	@step((name) => `${name} executes click`)
	async click() {
		await this._initRootElement();
		await this.__rootElement.click();
	}
}

module.exports = {
	Element,
};
