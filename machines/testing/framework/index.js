const { allureStep } = require("./../lib/report");
const { browserInterface } = require("./../lib/base/browser/index");
const { expect, initStepDeclarator } = require("assertior");
const { wrappedIt, wrappedBeforeEach, wrappedAfterEach, wrappedBeforeAll, wrappedAfterAll } = require("./../lib/runner/runner");

initStepDeclarator(allureStep);

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
