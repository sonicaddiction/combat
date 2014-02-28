var di = require('ng-di').di,
	injector;

require('./src/dice');

injector = di.injector(['combat.dice']);

injector.invoke(function (d6) {
	console.log("val:", d6);
});