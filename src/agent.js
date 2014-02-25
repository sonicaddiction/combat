var currentId = 0;

var Agent = function (id, name, hp) {
	this.name = name;
	this.id = id;
	this.hp = hp;
	this.actions = {};
	this.skills = {};
};

Agent.prototype.learnAction = function (action, skillValue) {
	this.actions[action.name] = action;
	this.skills[action.name] = skillValue;
};

module.exports = {
	getAgent: function (name, hp) {
		return new Agent(currentId++, name, hp);
	}
};