/**
 * @info we build wrapper around element handler
 * but always remember that this library can be updated/replaced
 * @see https://playwright.dev/docs/api/class-elementhandle
 */

class Element {
  /**
   * @param {string} selector element selector
   * @param {string} name element name
   * @param
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
  async initRootElement() {
    this.__rootElement = await this.__page.$(this.__rootSelector);
  }

  async click() {
    await this.initRootElement()
    await this.__rootElement.click()
  }

  async sendKeys(...keys) {
    await this.initRootElement();
    await this.__rootElement.type(...keys)
  }
}


module.exports = {
  Element
}