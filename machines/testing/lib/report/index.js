const { stepAllure, attachScreenshot, attachJsonData } = require("./allure");

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

module.exports = {
	step,
	attachScreenshot,
	attachJsonData,
};
