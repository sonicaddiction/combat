var mock = require('ng-di'),
	getAgent;

require('../src/agent.js');

describe('agent', function () {
	beforeEach(function() {
		getAgent = mock.injector(['combat.agent']).get('getAgent');
	});


	it('should create an agent with a name', function () {
		var agent = getAgent('Artemis');

		expect(agent.name).toBe('Artemis');
	});

	it('should be able to have its health set', function () {
		var agent = getAgent('Artemis', 10);

		expect(agent.hp).toBe(10);
	});

	it('should have increasing id numbers', function () {
		var agent1 = getAgent('Artemis'),
			agent2 = getAgent('Beatrice');

		expect(agent1.id).toBeLessThan(agent2.id);
	});
});
