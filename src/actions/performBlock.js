var di = require('ng-di');

di.module('combat.actions')

	/*
	 * Usage: .performBlock.from(attacker).with(weapon)
	 */

	.factory('performBlock', function (Action) {
		return function (attacker) {
			var action = new Action('performBlock', attacker);

			action.createSetChain([
				{
					name: 'from',
					value: 'attacker'
				},
				{
					name: 'with',
					value: 'weapon'
				}
			]);

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