const { browserInterface } = require("./../lib/base/browser/index");
const { expect } = require("assertior");
const { wrappedIt, wrappedOnly, wrappedBeforeEach, wrappedAfterEach, wrappedBeforeAll, wrappedAfterAll } = require("./../lib/runner/runner");

const provider = {
	get packages() {
		return { expect };
	},
	get browser() {
		return browserInterface;
	},
	get testRunner() {
		return {
			it: wrappedIt,
			beforeEach: wrappedBeforeEach,
			afterEach: wrappedAfterEach,
			beforeAll: wrappedBeforeAll,
			afterAll: wrappedAfterAll,
		};
	},
};

module.exports = {
	provider,
};
