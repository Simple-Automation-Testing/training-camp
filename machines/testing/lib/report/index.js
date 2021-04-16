const { stepAllure, attachScreenshot, attachJsonData } = require("./allure");

function step(stepName) {
	return function (_target, _name, descriptor) {
		const originalValue = descriptor.value;

		descriptor.value = function (...args) {
			let localStepName = stepName;
			localStepName = "\n" + (typeof localStepName === "string" ? localStepName : localStepName(this.name));

			if (this.constructor.name.includes("Element")) {
				localStepName = `\t ${localStepName} arguments ${JSON.stringify(args)}`;
			}

			if (this.constructor.name.includes("Browser")) {
				localStepName = `${localStepName}  ${args[0] ? args[0] : ""}`;
			}
			return stepAllure(localStepName, originalValue.bind(this, ...args));
		};
		return descriptor;
	};
}

module.exports = {
	step,
	attachScreenshot,
	attachJsonData,
};
