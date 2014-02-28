var di = require('ng-di').di,
	injector;

require('./src/agent.js');

injector = di.injector(['combat.agent']);

injector.invoke(function (getAgent) {
	console.log(getAgent('Krill', 10));
	console.log(getAgent('Krill2', 10));
	console.log(getAgent('Krill2', 10));
	console.log(getAgent('Krill2', 10));
});