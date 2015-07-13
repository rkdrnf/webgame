var roomManager = module.exports = {};
var userManager = require('./userManager.js');

var uuid = require('uuid');
require('array.prototype.find');

roomManager.r_new = function(req, res){
	var newRoom = roomManager.newRoom();
	res.redirect(newRoom.path());
	var user = userManager.createifnew(req.session.user_id);
	newRoom.users.push(user);
	console.log('after redirect');
};

roomManager.r_join = function(req, res){
	var room = roomManager.getRoom(req.params.id);
	res.render('room', { users: room.users, roomID: room.id});
	var user = userManager.createifnew(req.session.user_id);
	room.users.push(user);
	console.log('after join');
};



roomManager.rooms = [];
roomManager.newRoom = function()
{
	var	newRoom = new room();
	this.rooms.push(newRoom);
	return newRoom;
}
roomManager.getRoom = function(id)
{
	return this.rooms.find(function(element, index, array){
		console.log("find" + element.id + "id : " + id);
		return element.id == id;
	});
}


function room()
{
	this.id = uuid.v1();
	this.users = [];
	this.name = "";

	this.path = function(){
		return "room/" + this.id;
	}
}
