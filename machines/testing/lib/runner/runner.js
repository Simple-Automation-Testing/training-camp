const { browserInterface } = require("../base/browser/index");

function wrapedTest(cb) {
	return async function () {
		try {
			await cb();
		} catch (error) {
			console.log("wrapped test");
			//await browserInterace.attachAllureScreenshot();
			throw error;
		}
	};
}

function wrappedIt(name, cb) {
	global.it(name, async function () {
		await wrapedTest(cb).call(this);
	});
}

function wrappedBeforeEach(name, cb) {
	global.beforeEach(name, async function () {
		await wrapedTest(cb).call(this);
	});
}

function wrappedAfterEach(name, cb) {
	global.afterEach(name, async function () {
		await wrapedTest(cb).call(this);
	});
}

module.exports = {
	wrappedBeforeEach,
	wrappedIt,
	wrappedAfterEach,
};
