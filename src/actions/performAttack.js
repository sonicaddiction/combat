var Action = require('../action');

exports.performAttack = function (attacker) {
	var action = new Action('performAttack', attacker);

	action.on = function (name) {
		action.defender = name;

		return {
			with: function (weapon) {
				action.weapon = weapon;
				return action;
			}
		};
	};

	action.perform = function () {
		if (!action.defender) {
			throw new Error('use the on() function');
		}

		if (!action.weapon) {
			throw new Error('use the with() function');
		}

		console.log(action.performer.name, 'attacks', action.defender.name, 'with', action.weapon);
	};

	return action;
};