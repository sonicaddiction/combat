var di = require('ng-di').di,
	injector;

require('./src/agentFactory.js');

injector = di.injector(['combat.agent-factory']);

injector.invoke(function (getFighter) {
	console.log(getFighter('Kristofer'));
});