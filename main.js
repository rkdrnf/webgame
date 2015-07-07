var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var roomManager = require('./room.js');

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function(req, res){
	res.render('lobby', { rooms: roomManager.rooms });
});

app.post('/room', function(req, res){
	var newRoom = roomManager.newRoom();
	res.redirect(newRoom.path());
});

app.get('/room/:id', function(req, res){
	var room = roomManager.getRoom(req.params.id);
	console.log(room);
	res.render('room', { users: room.users, roomID: room.id});
});

io.on('connection', function(socket){
	console.log('a user connected');


	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


