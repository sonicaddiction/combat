var mock = require('ng-di/mock');

require('../../src/round.js');

describe('round', function () {
	beforeEach(mock.module('combat.round'));

	it('should set up a round with empty action, block and attack lists', mock.inject(function (newRound) {
		var round = newRound();

		expect(round.actionList.length).toBe(0);
		expect(round.attackList.length).toBe(0);
		expect(round.blockList.length).toBe(0);
	}));
});