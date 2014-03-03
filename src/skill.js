var di = require('ng-di');

di.module('combat.skill', ['combat.dice'])
	.factory('getSkill', function (d20) {
		function Skill(name, skillValue) {
			this.name = name;
			this.skillValue = skillValue;
		}

		Skill.prototype.skillCheck = function (modification) {
			var roll = d20(),
				requirement = this.skillValue + (modification || 0);

			return roll <= requirement;
		};

		Skill.prototype.skillCheckVs = function (difficulty) {
			var roll = d20(),
				diff = this.skillValue - difficulty,
				requirement = 10 + diff;

			return roll <= requirement;
		};

		Skill.prototype.skillCheckDiff = function (modification) {
			var roll = d20(),
				actualSkill = this.skillValue + (modification || 0);

			return actualSkill - roll;
		};

		return function (name, skillValue) {
				return new Skill(name, skillValue);
		};
	});