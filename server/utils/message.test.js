const expect = require('expect');
const assert = require('assert');
const { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const message = generateMessage('quanny', 'henlo');
		expect(message.from).toBe('quanny');
		expect(message.text).toBe('henlo');
		assert.equal('string', typeof message.createdAt);
	});
});

describe('generateLocationMessage', () => {
	it('should generate location object', () => {
		const name = 'meeshy';
		const lat = 1;
		const lon = 2;
		const location = generateLocationMessage(name, lat, lon);
		expect(location.from).toBe(name);
		expect(location.url).toBe(`https://www.google.com/maps?q=${lat},${lon}`);
		assert.equal('string', typeof location.createdAt);
	});
});