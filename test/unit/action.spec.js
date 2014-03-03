var mock = require('ng-di/mock');

require('../../src/action.js');

describe('action', function () {
	beforeEach(mock.module('combat.action'));

	it('should return an an action', mock.inject(function (getAction) {
		var action = getAction('jump');

		expect(action.type).toBe('jump');
	}));

	it('should return predefined actions', mock.inject(function (getAttack, getBlock) {
		var attack = getAttack(),
			block = getBlock();

		expect(attack.type).toBe('attack');
		expect(block.type).toBe('block');
	}));

	it('should return a set of actions', mock.inject(function (perform) {
		expect(perform.attack().type).toBe('attack');
		expect(perform.block().type).toBe('block');
	}));

	it('should support setting agents by chaining functions', mock.inject(function (perform) {
		var attack = perform.attack(),
			block = perform.block();

		attack.attacker('agent1').defender('agent2');
		block.attacker('agent1').defender('agent2');

		expect(attack.attacker).toBe('agent1');
		expect(attack.defender).toBe('agent2');

		expect(block.attacker).toBe('agent1');
		expect(block.defender).toBe('agent2');
	}));
});