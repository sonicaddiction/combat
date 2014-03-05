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
	'combat.agentFactory',
	'combat.action'
]);

injector.invoke(function (getEngine, getFighter, perform) {
	var engine = getEngine(),
		a1 = getFighter('Krill'),
		a2 = getFighter('Zondar'),
		a3 = getFighter('Yokanza'),
		round = 0;

	engine.addAgent(a1);
	engine.addAgent(a2);
	engine.addAgent(a3);

	function bothPlayersAlive () {
		return !(a1.status.dead || a2.status.dead);
	}

	while (bothPlayersAlive()) {
		engine.newRound(function (queueAction) {
			console.log('---------------- Round:', round, '----------------')
			queueAction(perform.attack().setAttacker(a1).setDefender(a2));
			queueAction(perform.block().setDefender(a2).setAttacker(a1));

			queueAction(perform.attack().setAttacker(a2).setDefender(a1));
			queueAction(perform.block().setDefender(a1).setAttacker(a2));
		});

		console.log(a1.name + ':', a1.hp);
		console.log(a2.name + ':', a2.hp);

		round++;
	}
});
