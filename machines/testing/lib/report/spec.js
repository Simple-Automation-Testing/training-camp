async function attachSpecJsonData(title, data) {
	console.log(`\n\t${title}: \n\t\t${JSON.stringify(data)}`);
}

async function stepSpec(name, cb) {
	console.log(name);
	return await cb();
}

module.exports = {
	stepSpec,
	attachSpecJsonData,
};
