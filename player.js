var player = module.exports = {};

player = function () {
	this.dir;
	this.pos = {x: 0, y: 0};
	this.inputs = [];
	this.user = undefined;
};


player.prototype.processInputs = function() {
	this.inputs.forEach(function(input) {
		console.log("input " + input + " processed");
	});
};

player.prototype.addInput = function(input) {
	this.inputs.push(input);
};
