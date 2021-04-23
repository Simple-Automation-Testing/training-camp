const { allure } = require("allure-mocha/runtime");
const { ContentType } = require("allure-js-commons");
const { browserInterface } = require("./../lib/base/browser/index");
const { expect, initStepDeclarator } = require("assertior");
const { wrappedIt, wrappedBeforeEach, wrappedAfterEach } = require("./../lib/runner/runner");

function allureStep(stepAssertionName, error, current, expected) {
	const step = allure.startStep(stepAssertionName);
	allure.attachment("Expected value", JSON.stringify(expected, null, 2), ContentType.JSON);
	allure.attachment("Current value", JSON.stringify(current, null, 2), ContentType.JSON);
	if (error) {
		allure.attachment("Error", JSON.stringify(error, null, 2), ContentType.JSON);
		step.step.stepResult.status = "failed";
		return step.endStep();
	}
	step.step.stepResult.status = "passed";
	return step.endStep();
}

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
		};
	},
};

module.exports = {
	provider,
};
