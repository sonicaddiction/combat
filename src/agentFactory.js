var di = require('ng-di').di,
	Agent = require('./agent.js'),
	ActionFactory = require('./actionFactory.js');

di.module('combat.agent-factory', [])

	.factory('getFighter', function () {
		return function (name) {
			var fighter = Agent.getAgent(name, 10);
			fighter.type = 'fighter';

//	fighter.learnAction(ActionFactory.performAttack(fighter), 60);
//	fighter.learnAction(ActionFactory.performBlock(fighter), 50);

			return fighter;
		};
	});