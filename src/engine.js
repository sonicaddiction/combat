var Engine = function () {
	this.agents = {};
	this.actionQueue = [];
};

Engine.prototype.addAgent = function (agent) {
	if (this.agents[agent]) {
		throw new Error('Agent already exists');
	} else {
		this.agents[agent.id] = agent;
	}
};

Engine.prototype.queueAction = function (action) {
	this.actionQueue.push(action);
};

Engine.prototype.step = function () {
	var currentAction = this.actionQueue.pop();

	currentAction();
};

module.exports = Engine;