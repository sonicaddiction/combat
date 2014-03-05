var di = require('ng-di');

di.module('combat.agentFactory', [
		'combat.agent',
		'combat.weapon',
		'combat.skill'
	])

	.factory('getFighter', function (getAgent, getWeapon, getSkill) {
		return function (name) {
			var fighter = getAgent(name, 10),
				sword = getWeapon('sword', 'broad sword', 4);
			fighter.type = 'fighter';

			fighter.setWeapon(sword);

			fighter.learnSkill('sword', getSkill('sword', 10));
			fighter.learnSkill('initiative', getSkill('initiative', 10));
			fighter.learnSkill('initiative', getSkill('toughness', 5));

			return fighter;
		};
	});