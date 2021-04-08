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

	async getArrayOfTextcontentAndIndexFromListOfItems(singleItemLocator) {
		await this._initRootElement();
		// start
		// const name = "anav1";
		// const elHandleArray = await this.__page.$$("//div[@class='user_item']");
		// elHandleArray
		// .forEach((el) => {
		// let res = el.innerText;
		// console.log(res);
		// })
		// .then((res) => console.log(res));
		// end
		const usersArray = await this.__rootElement.$$eval(singleItemLocator, (nodes) => {
			return nodes.map((item) => {
				return item.innerText.trim();
			});
		});
		const name = "anav2";
		console.log(usersArray);
		let adminIndex = usersArray.findIndex(name);
		return adminIndex;
	}

	async getElements(elem) {
		await this._initRootElement();
		const elHtml = await this.__page.$$(elem);
		//return elHtml;
	}
}

module.exports = {
	Container,
};
