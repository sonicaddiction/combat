var di = require('ng-di');

di.module('combat.action', [])

	.factory('getAction', function () {
		function Action(type) {
			this.type = type;
			this.priority = -Number.MAX_VALUE;
		}

		Action.prototype.setPriority = function(priority) {
			this.priority = priority;
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