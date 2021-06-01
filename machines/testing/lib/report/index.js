const { stepAllure } = require("./allure");
const { stepSpec } = require("./spec");
const { color } = require("mocha/lib/reporters/base");
const { ContentType } = require("allure-js-commons");
const { REPORTER } = process.env;
const { initStepDeclarator } = require("assertior");

function step(stepName) {
	return function (_target, _name, descriptor) {
		const originalValue = descriptor.value;

		descriptor.value = function (...args) {
			let localStepName = stepName;
			localStepName = typeof localStepName === "string" ? localStepName : localStepName(this.__id);

			if (Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.includes("Element")) {
				if (REPORTER == "ALLURE") {
					localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args[0])}` : " "}`;
				}
				if (REPORTER == "SPEC") {
					localStepName = `\t\t${localStepName} ${args[0] ? `with argument: \n\t\t${JSON.stringify(args[0])}` : " "}`;
				}
			}

			if (Object.getPrototypeOf(Object.getPrototypeOf(this)).constructor.name.includes("Page")) {
				if (REPORTER == "ALLURE") {
					localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args[0])}` : " "}`;
				}
				if (REPORTER == "SPEC") {
					localStepName = `\t${localStepName} ${args[0] ? `with argument: \n\t${JSON.stringify(args[0])}` : " "}`;
				}
			}

			if (this.constructor.name.includes("Browser")) {
				if (REPORTER == "ALLURE") {
					localStepName = `${localStepName} ${args[0] ? `with argument: ${JSON.stringify(args)}` : " "}`;
				}
				if (REPORTER == "SPEC") {
					localStepName = `  ${localStepName} ${args[0] ? `with argument: \n  ${JSON.stringify(args)}` : " "}`;
				}
			}

			if (REPORTER == "ALLURE") {
				return stepAllure(localStepName, originalValue.bind(this, ...args));
			}

			if (REPORTER == "SPEC") {
				return stepSpec(localStepName, originalValue.bind(this, ...args));
			}
		};

		return descriptor;
	};
}

function reporterStep(stepAssertionName, error, current, expected) {
	if (REPORTER == "ALLURE") {
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
	if (REPORTER == "SPEC") {
		const resultColor = error ? "fail" : "pass";
		console.log(`  EXPECTED VALUE: ${color("pass", `${JSON.stringify(expected, null, 2)}`)}`);
		console.log(`  CURRENT VALUE": ${color(resultColor, `${JSON.stringify(current, null, 2)}`)}`);
		if (error) {
			console.log(`  ERROR: ${color("diff added", `${JSON.stringify(error)}`)}`);
		}
	}
}

initStepDeclarator(reporterStep);

module.exports = {
	step,
	reporterStep,
};
