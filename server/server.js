const path = require('path');
const http = require('http');   //express is actually built on http
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');


const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);   //this method is basically called with the app.listen method
const io = socketIO(server);

app.use(express.static(publicPath));  //for the app to access static assets in the public folder


io.on('connection', (socket) => {   //our event listener
	console.log('new user connected');

	socket.emit('newMessage', generateMessage('admin','welcome user'))

	socket.broadcast.emit('newMessage', generateMessage('admin','a new challenger has appeared'))

	socket.on('createMessage', (message, callback) => {
		console.log('logging message', message);
		io.emit('newMessage', generateMessage(message.from, message.text)); //the broadcast event fires to everybody but myself
		callback('message sent'); //our acknowledgement passed to the frontend
	});

	socket.on('createLocationMessage', (location) => {
		io.emit('newLocationMessage', generateLocationMessage('quanny', location.latitude, location.longitude));
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
})



server.listen(port, () => {
	console.log(`starting on port ${port}`);
});