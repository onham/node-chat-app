
class Users {
	constructor() {
		this.users = []
	}

	addUser(id, name, room) {
		const user = {
			id, 
			name, 
			room
		}
		this.users.push(user);
		return user;
	}

	removeUser(id){
		const user = this.getUser(id);

		if (user) {
			this.users = this.users.filter((user) => user.id !== id);
		}

		return user;
	}

	getUser(id){
		const getUser = this.users.filter((user) => user.id === id);

		return getUser[0];
	}

	getUserList(room){
		const users = this.users.filter((user) => user.room === room);
		const namesArray = users.map((user) => user.name);

		return namesArray;
	}
}

module.exports = {
	Users
}