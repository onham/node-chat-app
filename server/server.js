const path = require('path');
const http = require('http');   //express is actually built on http
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

const app = express();

const server = http.createServer(app);   //this method is basically called with the app.listen method
const io = socketIO(server);

app.use(express.static(publicPath));  //for the app to access static assets in the public folder

io.on('connection', (socket) => {   //our event listener
	console.log('new user connected');
 
	// socket.emit('newMessage', {     //emit will send the 2nd arg to the listener on our client side and pass that in as the arg to the callback func
	// 	from: 'quanny@example.com',
	// 	text: 'Hey whats up thotty',
	// 	createdAt: 123
	// }); 

	socket.emit('newMessage', {
		from: 'admin',
		text: 'welcome to the chat',
		createdAt: new Date().getTime()
	})

	socket.broadcast.emit('newMessage', {
		from: 'admin',
		text: 'new user joined the chat',
		createdAt: new Date().getTime()
	})


	socket.on('createMessage', (message) => {
		console.log('logging message', message);
		// io.emit('newMessage', {       //emitting an event to every single socket/connection
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// });


		socket.broadcast.emit('newMessage', { //the broadcast event fires to everybody but myself
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
})



server.listen(port, () => {
	console.log(`starting on port ${port}`);
});