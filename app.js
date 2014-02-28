var di = require('ng-di').di,
	injector;

require('./src/agent.js');
require('./src/agentFactory.js');

injector = di.injector(['combat.agent-factory']);

injector.invoke(function (getFighter) {
	console.log(getFighter('Krill'));
});