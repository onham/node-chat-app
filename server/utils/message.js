const moment = require('moment');



const generateMessage = (from, text) => {
	const createdAt = moment().valueOf();
	const date = moment(createdAt);
	const currTime = date.format('h:mm a');

	return {
		from,
		text, 
		createdAt: currTime
	};
};

const generateLocationMessage = (from, lat, lon) => {
	const createdAt = moment().valueOf();
	const date = moment(createdAt);
	const currTime = date.format('h:mm a');

	return {
		from,
		url: `https://www.google.com/maps?q=${lat},${lon}`,
		createdAt: currTime
	}
}

module.exports = {
	generateMessage,
	generateLocationMessage
};