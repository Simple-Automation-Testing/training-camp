module.exports = {
	require: "@babel/register",
	timeout: 15000,
	reporter: "allure-mocha",
	reporterOptions: ["resultsDir=./testing/allure/allure-results"],
	spec: ["./testing/**/*.spec.js"],
	retries: 1,
};
