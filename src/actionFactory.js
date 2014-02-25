var Action = require('./action');

function performAttack (attacker) {
	var action = new Action('performAttack', function (defender) {
		console.log(attacker.name + ' attacks ' + defender.name);
	});

	return action;
}

module.exports = {
	performAttack: performAttack
};