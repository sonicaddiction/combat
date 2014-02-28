var di = require('ng-di'),
	injector;

// Load dependencies
require('./src/agent.js');
require('./src/agentFactory.js');
require('./src/action.js');
require('./src/actionFactory.js');
require('./src/actions/performAttack.js');
require('./src/actions/performBlock.js');

injector = di.injector(['combat.agent-factory']);

injector.invoke(function (getFighter) {
	console.log(getFighter('Krill'));
});
