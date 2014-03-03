var mock = require('ng-di/mock'),
	mockData = require('./../mocks.js');

require('../../src/agentFactory.js');

describe('agentFactory', function () {

	beforeEach(mock.module('combat.agent-factory'));

	beforeEach(mock.module(function ($provide) {
		$provide.value('getAgent', function () {
			return mockData.agent;
		});
		$provide.value('getSkill', function () {
			return mockData.skill;
		});
	}));

	it('should create a fighter with type fighter', mock.inject(function (getFighter) {
		var agent = getFighter('Artemis');

		expect(agent.type).toBe('fighter');
	}));
});
