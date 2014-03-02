var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/engine.js');
require('./src/agent.js');
require('./src/agentFactory.js');
require('./src/action.js');
require('./src/dice.js');
require('./src/actionFactory.js');
require('./src/actions/performAttack.js');
require('./src/actions/performBlock.js');

injector = di.injector([
	'combat.engine',
	'combat.agent-factory',
	'combat.action'
]);

injector.invoke(function (getEngine, getFighter, Action) {
	var engine = getEngine(),
		fighter1 = getFighter('Krill'),
		performJump = new Action('jump', {
			skills: {
				jump: 50
			}
		});

	performJump.createSetChain([{
			name: 'from',
			value: 'startPlace'
		},
		{
			name: 'andLandOn',
			value: 'landingPlace'
		},
		{
			name: 'in',
			value: 'country'
		}]);

	performJump.success = function () {
		console.log('Success');
	};

	performJump.fail = function () {
		console.log('Fail');
	};

	performJump.from('a bridge').andLandOn('the ground').in('sweden');

	console.log(performJump);

//	performJump.perform();

//	engine.addAgent(fighter1);
//
//	console.log(engine);
});
