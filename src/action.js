var di = require('ng-di');

di.module('combat.action', [])

	.factory('getAction', function () {
		function Action(type) {
			this.type = type;
			this.initiative = -Number.MAX_VALUE;
			this.performer = null;
		}

		Action.prototype.setInitiative = function() {
			var initiative = this.performer.skills.initiative.skillCheckDiff();

			this.initiative = initiative;
		};

		return function (type) {
			return new Action(type);
		};
	})

	.factory('getAttack', function (getAction) {
		var attack = getAction('attack');

		attack.defender = function (defender) {
			this.defender = defender;
			return attack;
		};

		attack.attacker = function (attacker) {
			this.attacker = attacker;
			this.performer = attacker;
			return attack;
		};

		return function () {
			return attack;
		};
	})

	.factory('getBlock', function (getAction) {
		var block = getAction('block');

		block.defender = function (defender) {
			this.defender = defender;
			this.performer = defender;
			return block;
		};

		block.attacker = function (attacker) {
			this.attacker = attacker;
			return block;
		};

		return function () {
			return block;
		};
	})

	.factory('perform', function (getAttack, getBlock) {
		return {
			attack: getAttack,
			block: getBlock
		}
	});