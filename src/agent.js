var currentId = 0;

var Agent = function (id, name, hp) {
	this.name = name;
	this.id = id;
	this.hp = hp;
	this.actions = {};
};

Agent.prototype.learnAction = function (action) {
	this.actions[action.name] = action;
};

module.exports = {
	getAgent: function (name, hp) {
		return new Agent(currentId++, name, hp)
	}
};