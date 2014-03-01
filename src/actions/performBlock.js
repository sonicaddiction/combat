var di = require('ng-di');

di.module('combat.actions')

	/*
	 * Usage: .performBlock.from(attacker).with(weapon)
	 */

	.factory('performBlock', function (Action) {
		return function (attacker) {
			var action = new Action('performBlock', attacker);

			action.from = function (attacker) {
				action.attacker = attacker;
				return action;
			};

			action.with = function (weapon) {
				action.weapon = weapon;
				return action;
			};

			action.success = function () {
				if (!action.attacker) {
					throw new Error('use the from() function');
				}

				if (!action.weapon) {
					throw new Error('use the with() function');
				}

				console.log(action.performer.name, 'attempts to block an attack from', action.attacker.name, 'with', action.weapon);

				return action;
			};

			action.fail = function () {
				if (!action.attacker) {
					throw new Error('use the from() function');
				}

				if (!action.weapon) {
					throw new Error('use the with() function');
				}

				console.log(action.performer.name, 'attempts to block an attack from', action.attacker.name, 'with', action.weapon, 'but fails');

				return action;
			};

			return action;
		};
	});