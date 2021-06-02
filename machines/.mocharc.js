const { colors, symbols } = require("mocha/lib/reporters/base");
colors.suite = 94;
colors.pass = 92;
colors.fail = 91;

symbols.ok = "👍";
symbols.err = "💀";

module.exports = {
	require: "@babel/register",
	timeout: 15000,
	reporter: "allure-mocha",
	reporterOptions: ["resultsDir=./testing/allure/allure-results"],
	spec: ["./testing/**/*.spec.js"],
	retries: 0,
};
