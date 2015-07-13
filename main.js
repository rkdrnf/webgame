var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var roomManager = require('./room.js');
var userManager = require('./userManager.js');
var session = require('express-session');
var uuid = require('uuid');

app.use(session({
	genid: function(req) {
		return uuid.v1();
	},
	secret: 'mysecret'
}));

app.set('views', './views');
app.set('view engine', 'jade');


//lobby routes
app.get('/', function(req, res){
	console.log(req.session);
	var user = userManager.createifnew(req.sessionID);
	res.render('lobby', { rooms: roomManager.rooms, user: user });
});


//room routes
app.post('/room', roomManager.r_new); 
app.get('/room/:id', roomManager.r_join); 


//connection handlers
io.on('connection', function(socket){
	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


//listen
http.listen(3000, function(){
	console.log('listening on *:3000');
});


