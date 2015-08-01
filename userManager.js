var userManager = module.exports = {};
var uuid = require('uuid');
require('array.prototype.find');

userManager.users = [];
userManager.createifnew = function(req, user_id) {
	if(user_id == undefined)
	{
		console.log('session id undefined');
		return undefined;
	}
	else
	{
		var user = this.users.find(function(element, index, array) {
			return element.id == user_id;
		});

		if (user == undefined)
		{
			user = this.create(user_id);
		}

		req.session.user_id = user_id;

		return user;
	}
}
userManager.create = function(user_id) {
	var newUser = new user(user_id);
	this.users.push(newUser);

	console.log("new user: " + newUser.id + " connected");
	return newUser;
}


function user(user_id)
{
	this.id = user_id;
	this.name = "user";
}
