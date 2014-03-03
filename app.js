var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/engine.js');
require('./src/round.js');
require('./src/weapon.js');
require('./src/agent.js');
require('./src/agentFactory.js');
require('./src/dice.js');
require('./src/action.js');
require('./src/skill.js');

injector = di.injector([
	'combat.engine',
	'combat.agent-factory',
	'combat.action'
]);

injector.invoke(function (getEngine, getFighter, perform) {
	var engine = getEngine(),
		a1 = getFighter('Krill'),
		a2 = getFighter('Zondar');

	engine.addAgent(a1);
	engine.addAgent(a2);

	engine.newRound(function (queueAction) {
		queueAction(perform.attack().setAttacker(a1).setDefender(a2));
	});
});
