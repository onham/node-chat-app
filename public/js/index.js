var socket = io();  //making a request to the server to open up a web socket


socket.on('connect', function() { 
	console.log('connected to server');
});


socket.on('disconnect', function() {
	console.log('disconnected from server');
});


socket.on('newMessage', function(message) {
	console.log('new message received!', message);
	const li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);
	jQuery("#messages").append(li);
});


socket.on('newLocationMessage', function(message) {
	console.log('new message received!', message);
	const li = jQuery(`<li></li>`);
	const a = jQuery(`<a target="_blank">my current location<a>`)
	
	li.text(`${message.from}: `);
	a.attr('href', message.url);   //change attr of a tag -- for security -- to prevent code injection
	li.append(a);  //appending a to li

	jQuery('#messages').append(li);
});


document.getElementById("message-form").addEventListener('submit', function(e){
	e.preventDefault();
	
	const messageTextbox = document.getElementById("msg");

	socket.emit('createMessage', {
		from: 'quanny',
		text: messageTextbox.value
	}, function(message) {   //for acknowledgement from server to client -- passed to callback in backend 
		console.log(message);
		messageTextbox.value = " ";
	});
});


const locationButton = document.getElementById("send-location");
locationButton.addEventListener('click', async function(){
	if (!navigator.geolocation) {  //geolocation api
		return alert('geolocation not supported by browser');
	}

	locationButton.setAttribute('disabled', true);
	await navigator.geolocation.getCurrentPosition(function(position) {
		locationButton.removeAttribute('disabled');
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		}, (e) => {
			locationButton.removeAttribute('disabled');
			alert(e);
		}, {
			enableHighAccuracy: true
		});
	}, function(){
		alert('unable to fetch location');
	});
});
