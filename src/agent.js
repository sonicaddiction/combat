var di = require('ng-di');

di.module('combat.agent', [])

	.value('currentId', 0)

	.factory('getAgent', function (currentId) {
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

		return function (name, hp) {
			return new Agent(currentId++, name, hp);
		};
	});
