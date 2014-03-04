var di = require('ng-di');

di.module('combat.agent', [])

	.value('currentId', 0)

	.factory('getAgent', function (currentId) {
		var Agent = function (id, name, hp) {
			this.name = name;
			this.id = id;
			this.hp = hp;
			this.skills = {};
		};

		Agent.prototype.learnSkill = function (skill, skillValue) {
			this.skills[skill] = skillValue;
		};

		Agent.prototype.setWeapon = function (weapon) {
			this.weapon = weapon;
		};

		Agent.prototype.damage = function (damage) {
			this.hp = this.hp - damage;
		};

		Agent.prototype.weaponSkillCheck = function (modification) {
			var weaponType = this.weapon.type,
				skill = this.skills[weaponType];

			if (skill) {
				return skill.skillCheck(modification || 0);
			}
		};

		Agent.prototype.recieveDamage = function (damage) {
			this.hp = this.hp - damage;
		};

		return function (name, hp) {
			return new Agent(currentId++, name, hp);
		};
	});
