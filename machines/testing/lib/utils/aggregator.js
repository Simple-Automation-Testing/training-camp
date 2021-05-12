const aggregator = (function () {
	let page;
	return {
		getPage() {
			return page;
		},

		setPage(value) {
			page = value;
		},
	};
})();

module.exports = {
	aggregator,
};
