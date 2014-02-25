var Engine = require('./src/engine.js'),
	AgentFactory = require('./src/agentFactory.js'),
	agents = [],
	engine = new Engine(),
	action;

agents.push(AgentFactory.getFighter('Krill'));
agents.push(AgentFactory.getFighter('Rogert'));

agents.forEach(function (agent) {
	engine.addAgent(agent);
});

action = agents[0].actions.performAttack.on(agents[1]).with('a sword');

action = agents[1].actions.performBlock.from(agents[0]).with('a sword');


action.perform();