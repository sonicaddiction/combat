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
		krill = getFighter('Krill'),
		jimmy = getFighter('Jimmy'),
		action1 = krill.actions.performAttack.on(jimmy).with('a sword'),
		action2 = jimmy.actions.performBlock.from(krill).with('a club');

	action1.perform();
	action2.perform();
});
