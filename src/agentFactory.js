var di = require('ng-di');

di.module('combat.agent-factory', [
		'combat.agent',
		'combat.actions',
		'combat.weapon'
	])

	.factory('getFighter', function (getAgent, performAttack, performBlock, getWeapon) {
		return function (name) {
			var fighter = getAgent(name, 10),
				sword = getWeapon('sword', 4);
			fighter.type = 'fighter';

			fighter.setWeapon(sword);

			fighter.learnAction(performAttack(fighter), 60);
			fighter.learnAction(performBlock(fighter), 50);

			return fighter;
		};
	});