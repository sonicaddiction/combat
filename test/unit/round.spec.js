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

	it('should be able to queue actions', mock.inject(function (newRound) {
		var round = newRound(),
			spy1 = jasmine.createSpy(),
			spy2 = jasmine.createSpy();

		round.queueAction()({ setInitiative: spy1 });
		round.queueAction()({ setInitiative: spy2 });


		expect(round.actionList.length).toBe(2);
		expect(spy1).toHaveBeenCalled();
		expect(spy2).toHaveBeenCalled();
	}));

});