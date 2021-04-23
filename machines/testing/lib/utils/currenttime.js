async function currentTime() {
	let current = new Date();
	let year = current.getFullYear();
	let month = current.getMonth();
	let day = current.getDate();
	let hour = current.getHours();
	let minute = current.getMinutes();
	let second = current.getSeconds();

	return `${year}:${month}:${day}-${hour}:${minute}:${second}`;
}

module.exports = {
	currentTime,
};
