var di = require('ng-di');

di.module('combat.actions')

	/*
	 * Usage: .performAttack.on(defender).with(weapon)
	 */

	.factory('performAttack', function (Action) {
		return function (attacker) {
			var action = new Action('performAttack', attacker);

			action.createSetChain([
				{
					name: 'on',
					value: 'defender'
				}
			]);

			action.getInfo = function () {
				if (!action.defender) {
					throw new Error('use the on() function');
				}

				return {
					type: 'attack',
					attacker: this.performer,
					defender: this.defender
				};
			};

			return action;
		};
	});