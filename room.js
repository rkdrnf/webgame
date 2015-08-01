var roomManager = module.exports = {};
var userManager = require('./userManager.js');

var uuid = require('uuid');
require('array.prototype.find');

roomManager.r_new = function(req, res){
	var newRoom = roomManager.newRoom();
	var user = userManager.createifnew(req, req.session.user_id);
	newRoom.join(user);
	res.redirect(newRoom.path());
};

roomManager.r_join = function(req, res){
	var room = roomManager.getRoom(req.params.id);
	var user = userManager.createifnew(req, req.session.user_id);
	room.join(user);

	res.render('room', { users: room.users, roomID: room.id});
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

	this.join = function(user){
		var exist = this.users.find(function(element, index, array){
			return element.id == user.id;
		});

		if(!exist)
		{
			this.users.push(user);
		}
	}
}
