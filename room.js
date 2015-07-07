var roomManager = module.exports = {};

var uuid = require('uuid');
require('array.prototype.find');

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
