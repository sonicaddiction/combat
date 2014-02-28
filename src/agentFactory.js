var di = require('ng-di');

di.module('combat.agent-factory', [
		'combat.agent',
		'combat.actions'
	])

	.factory('getFighter', function (getAgent, performAttack, performBlock) {
		return function (name) {
			var fighter = getAgent(name, 10);
			fighter.type = 'fighter';

			fighter.learnAction(performAttack(fighter), 60);
			fighter.learnAction(performBlock(fighter), 50);

			return fighter;
		};
	});