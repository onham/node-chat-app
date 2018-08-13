var socket = io();  //making a request to the server to open up a web socket

socket.on('connect', function() { 
	console.log('connected to server');
	//we are emitting this event from the client to server -- irl would be the filling out of a form
	// socket.emit('createMessage', {
	// 	from: 'meeshy@example.com',
	// 	text: 'hey!'
	// });
});

socket.on('disconnect', function() {
	console.log('disconnected from server');
});

socket.on('newMessage', function(message) {
	console.log('new message received!', message);
});

