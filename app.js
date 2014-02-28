var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/engine.js');
require('./src/agent.js');
require('./src/agentFactory.js');
require('./src/action.js');
require('./src/actionFactory.js');
require('./src/actions/performAttack.js');
require('./src/actions/performBlock.js');

injector = di.injector([
	'combat.engine',
	'combat.agent-factory'
]);

injector.invoke(function (getEngine, getFighter) {
	var engine = getEngine(),
		fighter1 = getFighter('Krill');

	engine.addAgent(fighter1);

	console.log(engine);
});
