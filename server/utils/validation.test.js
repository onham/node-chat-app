const expect = require('expect');
const { isRealString } = require('./validation');

describe('isRealString', () => {
	it('should reject non-string values', () => {
		const str = 123;
		const check = isRealString(str);
		expect(check).not.toBeTruthy();
	});

	it('should reject string with only spaces', () => {
		const str = '     ';
		const check = isRealString(str);
		expect(check).not.toBeTruthy();
	})

	it('should allow string with non-space characters', () => {
		const str = 'henlo';
		const check = isRealString(str);
		expect(check).toBeTruthy();
	});
});