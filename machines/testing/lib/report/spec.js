async function attachSpecJsonData(title, data) {
	console.log(`\t${title}: \n\t${JSON.stringify(data)}`);
}

async function stepSpec(name, cb) {
	console.log(name);
	return await cb();
}

module.exports = {
	stepSpec,
	attachSpecJsonData,
};
