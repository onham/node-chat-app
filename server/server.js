const path = require('path');
const http = require('http');   //express is actually built on http
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);   //this method is basically called with the app.listen method
const io = socketIO(server);
const users = new Users();

app.use(express.static(publicPath));  //for the app to access static assets in the public folder


io.on('connection', (socket) => {   //our event listener
	console.log('new user connected');


	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('name and room name are required');
		}

		socket.join(params.room);
		users.removeUser(socket.id);  //socket.id is where you get the id for the object
		users.addUser(socket.id, params.name, params.room);

		io.to(params.room).emit('updateUserList', users.getUserList(params.room)); //emitting event to everyone in the room

		socket.emit('newMessage', generateMessage('admin','welcome user'))

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('admin', `${params.name} has joined`))
	});


	socket.on('createMessage', (message, callback) => {
		console.log('logging message', message);
		io.emit('newMessage', generateMessage(message.from, message.text)); //the broadcast event fires to everybody but myself
		callback('message sent'); //our acknowledgement passed to the frontend
	});

	socket.on('createLocationMessage', (location) => {

		io.emit('newLocationMessage', generateLocationMessage(location.name, location.latitude, location.longitude));
	});

	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('admin', `${user.name} has left`));
		}
		console.log('user disconnected');
	});
})



server.listen(port, () => {
	console.log(`starting on port ${port}`);
});