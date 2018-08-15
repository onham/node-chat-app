const expect = require('expect');
const { Users } = require('./users');



describe('Users', () => {
	let users;

	beforeEach('Seed users', () => {
		users = new Users();
		users.users = [
		{
			id: 1,
			name: 'quanny',
			room: 'node'
		},
		{
			id: 2,
			name: 'jenny',
			room: 'react'
		},
		{
			id: 3,
			name: 'julie',
			room: 'node'
		}
		]
	});

	it('should add new user', () => {
		const users = new Users();
		const user = {
			id: '123',
			name: 'Quanny',
			room: 'secret'
		};
		const resUser = users.addUser(user.id, user.name, user.room);

		expect(users.users).toEqual([user]);
	});

	it('should return names for node room', () => {
		const userList = users.getUserList('node');

		expect(userList).toEqual(['quanny', 'julie']);
	});

	it('should return names for react room', () => {
		const userList = users.getUserList('react');

		expect(userList).toEqual(['jenny']);
	});

	it('should remove a user', () => {
		const removedUser = users.removeUser(1);

		expect(removedUser.name).toEqual('quanny');
	});

	it('should not remove a user', () => {
		const removedUser = users.removeUser(4);

		expect(removedUser).toEqual(undefined);
	});

	it('should find a user', () => {
		const getUser = users.getUser(2);

		expect(getUser.name).toEqual('jenny');
	});


	it('should not find a user', () => {
		const getUser = users.getUser(4);

		expect(getUser).toEqual(undefined);
	});
});