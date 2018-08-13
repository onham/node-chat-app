const expect = require('expect');
const assert = require('assert');
const { generateMessage } = require('./message')

describe('generateMessage', () => {
	it('should generate correct message object', () => {
		const message = generateMessage('quanny', 'henlo');
		expect(message.from).toBe('quanny');
		expect(message.text).toBe('henlo');
		assert.equal('number', typeof message.createdAt);
	});
});