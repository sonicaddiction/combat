var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/engine.js');
require('./src/weapon.js');
require('./src/agent.js');
require('./src/agentFactory.js');
require('./src/dice.js');

injector = di.injector([
	'combat.engine',
	'combat.agent-factory'
]);

injector.invoke(function (getEngine, getFighter) {
	var engine = getEngine(),
		a1 = getFighter('Krill'),
		a2 = getFighter('Zondar');

	engine.addAgent(a1);
	engine.addAgent(a2);

	console.log(a1);
});
