var di = require('ng-di');

di.module('combat.agent-factory', [
		'combat.agent',
		'combat.weapon'
	])

	.factory('getFighter', function (getAgent, getWeapon) {
		return function (name) {
			var fighter = getAgent(name, 10),
				sword = getWeapon('sword', 4);
			fighter.type = 'fighter';

			fighter.setWeapon(sword);

			fighter.learnSkill('sword', 10);

			return fighter;
		};
	});