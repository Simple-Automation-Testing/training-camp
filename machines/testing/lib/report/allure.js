const { allure } = require("allure-mocha/runtime");
const { ContentType } = require("allure-js-commons");

async function attachScreenshot(title, png) {
	return allure.attachment(title, Buffer.from(png, "base64"), ContentType.PNG);
}

function attachJsonData(title, data) {
	return allure.attachment(title, data, ContentType.JSON);
}

async function stepAllure(name, cb) {
	const step = allure.startStep(name);
	try {
		const result = await cb();
		if (result) {
			allure.attachment(`${name} result`, JSON.stringify(result), ContentType.JSON);
		}
		// set success result
		step.step.stepResult.status = "passed";
		step.endStep();
		return result;
	} catch (error) {
		// set fail result
		step.step.stepResult.status = "broken";
		step.endStep();
		throw error;
	}
}

module.exports = {
	stepAllure,
	attachScreenshot,
	attachJsonData,
};
