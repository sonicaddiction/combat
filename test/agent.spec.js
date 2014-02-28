var mock = require('ng-di/mock');

require('../src/agent.js');

describe('agent', function () {
	beforeEach(mock.module('combat.agent'));

	it('should create an agent with a name', mock.inject(function (getAgent) {
		var agent = getAgent('Artemis');

		expect(agent.name).toBe('Artemis');
	}));

	it('should be able to have its health set', mock.inject(function (getAgent) {
		var agent = getAgent('Artemis', 10);

		expect(agent.hp).toBe(10);
	}));

	it('should have increasing id numbers', mock.inject(function (getAgent) {
		var agent1 = getAgent('Artemis'),
			agent2 = getAgent('Beatrice');

		expect(agent1.id).toBeLessThan(agent2.id);
	}));
});
