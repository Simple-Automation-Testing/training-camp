const { ContentType } = require("allure-js-commons");

async function attachScreenshot(title, png) {
	const { allure } = require("allure-mocha/runtime");
	return allure.attachment(title, Buffer.from(png, "base64"), ContentType.PNG);
}

function attachJsonData(title, data) {
	const { allure } = require("allure-mocha/runtime");
	return allure.attachment(title, data, ContentType.JSON);
}

async function stepAllure(name, cb) {
	const { allure } = require("allure-mocha/runtime");
	return allure.step(name, cb);
}

module.exports = {
	stepAllure,
	attachScreenshot,
	attachJsonData,
};
