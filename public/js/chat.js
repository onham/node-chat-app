var socket = io();  //making a request to the server to open up a web socket

function scrollToBottom() {
	//Selectors:
	const messages = jQuery("#messages");
	const newMessage = messages.children('li:last-child')
	//Heights:
	const clientHeight = messages.prop("clientHeight"); //basically the screen height
	const scrollTop = messages.prop("scrollTop"); //how far we've scrolled down the screen
	const scrollHeight = messages.prop("scrollHeight"); //the total scroll height
	const newMessageHeight = newMessage.innerHeight();
	const lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight);
	}
}

socket.on('connect', function() { 
	console.log('connected to server');
});


socket.on('disconnect', function() {
	console.log('disconnected from server');
});


socket.on('newMessage', function(message) {
	const template = jQuery("#message-template").html();

	//using mustache to render our markup
	const html = Mustache.render(template, {   
		text: message.text,
		from: message.from,
		createdAt: message.createdAt
	});

	jQuery("#messages").append(html);
	scrollToBottom();
});


socket.on('newLocationMessage', function(message) {
	const template = jQuery("#location-message-template").html();

	//using mustache to render our markup
	const html = Mustache.render(template, {   
		text: 'My current location',
		from: message.from,
		url: message.url,
		createdAt: message.createdAt
	});

	jQuery("#messages").append(html);
	scrollToBottom();
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