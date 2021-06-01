const { browserInterface } = require("../base/browser/index");
const { REPORTER } = process.env;

function wrapedTest(cb) {
	return async function () {
		try {
			await cb();
		} catch (error) {
			await browserInterface.attachFailConditions();
			throw error;
		}
	};
}

function wrappedIt(name, cb) {
	global.it(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`\t`);
		}
		await wrapedTest(cb).call(this);
	});
}

function wrappedOnly(name, cb) {
	global.it.only(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`\t`);
		}
		await wrapedTest(cb).call(this);
	});
}

function wrappedBeforeEach(name, cb) {
	global.beforeEach(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`${"***** ".repeat(15)}`);
			console.log(`  ${name}:`);
		}
		await wrapedTest(cb).call(this);
	});
}

function wrappedAfterEach(name, cb) {
	global.afterEach(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`  ${name}:`);
		}
		await wrapedTest(cb).call(this);
	});
}

function wrappedBeforeAll(name, cb) {
	global.before(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`  ${name}:`);
		}
		await wrapedTest(cb).call(this);
	});
}

function wrappedAfterAll(name, cb) {
	global.after(name, async function () {
		if (REPORTER == "SPEC") {
			console.log(`  ${name}:`);
		}
		await wrapedTest(cb).call(this);
	});
}

module.exports = {
	wrappedBeforeEach,
	wrappedIt,
	wrappedAfterEach,
	wrappedBeforeAll,
	wrappedAfterAll,
	wrappedOnly,
};
