var Engine = function () {
	this.agents = {};
}

Engine.prototype.addAgent = function (agent) {
	if (this.agents[agent]) {
		throw new Error('Agent already exists');
	} else {
		this.agents[agent.id] = agent;
	}
}

module.exports = Engine;