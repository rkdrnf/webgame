var frame_time = 45;


var gameCore = function() {
	this.pdt = 0.0001;
	this.pdte = new Date().getTime();

	this.dt = new Date().getTime();
	this.dte = new Date().getTime();
}

gameCore.prototype.createTimer = function() {
	setInterval(function(){
		this.dt = new Date().getTime() - this.dte;
		this.dte = new Date().getTime();
		this.localTime += this.dt/1000.0;
	}.bind(this), 4);

};

gameCore.prototype.createPhysicsTimer = function() {
	setInterval(function(){
		this.pdt = (new Date().getTime() - this.pdte) / 1000;
		this.pdte = new Date().getTime();
		this.updatePhysics();
	}.bind(this), 15);
};

gameCore.prototype.updatePhysics = function() {
	this.players.forEach(function(player) {
		player.oldStatePos = player.pos;
		player.processInputs();
	});
};
