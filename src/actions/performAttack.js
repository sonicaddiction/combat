var Action = require('../action');

/*
 * .performAttack.on(defender).with(weapon)
 */

function performAttack(attacker) {
	var action = new Action('performAttack', attacker);

	action.on = function (defender) {
		action.defender = defender;
		return action;
	};

	action.with = function (weapon) {
		action.weapon = weapon;
		return action;
	};

	action.success = function () {
		if (!action.defender) {
			throw new Error('use the on() function');
		}

		if (!action.weapon) {
			throw new Error('use the with() function');
		}

		console.log(action.performer.name, 'attacks', action.defender.name, 'with', action.weapon);

		return action;
	};

	action.fail = function () {
		console.log(action.performer.name, 'attacks', action.defender.name, 'with', action.weapon, 'but misses');
	};

	return action;
}

module.exports = performAttack;