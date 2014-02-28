var Agent = require('../src/agent.js');

describe('agent', function () {
	it('should create an agent with a name', function () {
		var agent = Agent.getAgent('Artemis');

		expect(agent.name).toBe('Artemis');
	});

	it('should be able to have its health set', function () {
		var agent = Agent.getAgent('Artemis', 10);

		expect(agent.hp).toBe(10);
	});

	it('should have increasing id numbers', function () {
		var agent1 = Agent.getAgent('Artemis'),
			agent2 = Agent.getAgent('Beatrice');

		expect(agent1.id).toBeLessThan(agent2.id);
	});
});
