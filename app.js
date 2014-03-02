var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/engine.js');
require('./src/weapon.js');
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
		a1 = getFighter('Krill'),
		a2 = getFighter('Zondar');

	engine.addAgent(a1);
	engine.addAgent(a2);

	engine.queueAction(a1.actions.performAttack.on(a2));

	engine.step();
});
