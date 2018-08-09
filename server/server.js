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

	socket.on('disconnect', () => {
		console.log('user disconnected');
	})
})



server.listen(port, () => {
	console.log(`starting on port ${port}`);
});