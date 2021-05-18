const { stepAllure, attachScreenshot, attachJsonData } = require("./allure");
const { ContentType } = require("allure-js-commons");

function step(stepName) {
	return function (_target, _name, descriptor) {
		const originalValue = descriptor.value;

		descriptor.value = function (...args) {
			let localStepName = stepName;
			localStepName = typeof localStepName === "string" ? localStepName : localStepName(this.__id);

			if (Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.includes("Element")) {
				localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args[0])}` : " "}`;
			}

			if (Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.includes("Page")) {
				localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args[0])}` : " "}`;
			}

			if (this.constructor.name.includes("Browser")) {
				localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args)}` : " "}`;
			}

			return stepAllure(localStepName, originalValue.bind(this, ...args));
		};

		return descriptor;
	};
}

function allureStep(stepAssertionName, error, current, expected) {
	const { allure } = require("allure-mocha/runtime");
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

module.exports = {
	step,
	attachScreenshot,
	attachJsonData,
	allureStep,
};
