const Mocha = require("mocha");
const { colors, symbols, color } = require("mocha/lib/reporters/base");
const { EVENT_RUN_BEGIN, EVENT_RUN_END, EVENT_TEST_FAIL, EVENT_TEST_PASS, EVENT_SUITE_BEGIN, EVENT_SUITE_END } = Mocha.Runner.constants;

colors.suite = 94;
colors.msec = 93;
symbols.ok = "👍";
symbols.err = "💀";

class SpecReporter {
	constructor(runner) {
		this._indents = 0;
		const stats = runner.stats;
		let runDuration = 0;

		runner
			.once(EVENT_RUN_BEGIN, () => {
				console.log(`${color("pending", `TEST RUN START`)}`);
			})
			.on(EVENT_SUITE_BEGIN, () => {
				this.increaseIndent();
			})
			.on(EVENT_SUITE_END, () => {
				this.decreaseIndent();
			})
			.on(EVENT_TEST_PASS, (test) => {
				console.log(`\n${color("suite", `  ${test.parent.parent.title}`)}`);
				console.log(`${this.indent()}${color("suite", ` ${test.parent.title}`)}`);
				console.log(`${this.indent()}${this.indent()}${color("suite", `${test.title}`)}`);
				console.log(`${this.indent()}${this.indent()}${symbols.ok} ${color("pass", `TEST PASSED in `)}${color("msec", `(${test.duration} ms)\n`)}`);
				runDuration += test.duration;
			})
			.on(EVENT_TEST_FAIL, (test, err) => {
				console.log(`\n${color("suite", `  ${test.parent.parent.title}`)}`);
				console.log(`${this.indent()}${color("suite", ` ${test.parent.title}`)}`);
				console.log(`${this.indent()}${this.indent()}${color("suite", `${test.title}`)}`);
				console.log(`${this.indent()}${this.indent()}${symbols.err} ${color("fail", `TEST FAILED in `)}${color("msec", `(${test.duration} ms)\n`)}`);
				runDuration += test.duration;
			})
			.once(EVENT_RUN_END, () => {
				console.log(`\n${color("pending", `TEST RUN END: ${stats.passes}/${stats.passes + stats.failures} passed in (${runDuration} ms)\n`)}`);
			});
	}

	indent() {
		return Array(this._indents).join("  ");
	}

	increaseIndent() {
		this._indents++;
	}

	decreaseIndent() {
		this._indents--;
	}
}

module.exports = SpecReporter;
