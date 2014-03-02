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
				}
			]);

			action.getInfo = function () {
				if (!action.defender) {
					throw new Error('use the on() function');
				}

				return {
					type: 'block',
					attacker: this.attacker,
					defender: this.performer
				};
			};

			return action;
		};
	});