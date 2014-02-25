var Engine = require('./engine.js'),
	AgentFactory = require('./agentFactory.js'),
	agents = [],
	engine = new Engine;

agents.push(AgentFactory.getFighter('Krill'));
agents.push(AgentFactory.getFighter('Rogert'));

agents.forEach(function (agent) {
	engine.addAgent(agent);
});

engine.queueAction(agents[0].actions.performAttack.on(agents[1]));