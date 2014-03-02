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

		Agent.prototype.setWeapon = function (weapon) {
			this.weapon = weapon;
		};

		Agent.prototype.damage = function (damage) {
			this.hp = this.hp - damage;
		};

		return function (name, hp) {
			return new Agent(currentId++, name, hp);
		};
	});
