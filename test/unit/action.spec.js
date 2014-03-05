var mock = require('ng-di/mock');

require('../../src/action.js');

describe('combat.action', function () {
	beforeEach(mock.module('combat.action'));

	describe('getAction', function () {
		it('should return an an action', mock.inject(function (getAction) {
			var action = getAction('jump');

			expect(action.type).toBe('jump');
		}));
	});

	describe('perform', function () {
		it('should return a set of actions', mock.inject(function (perform) {
			expect(perform.attack().type).toBe('attack');
			expect(perform.block().type).toBe('block');
		}));
	});

	describe('getAttack and getBlock', function () {
		it('should return predefined actions', mock.inject(function (getAttack, getBlock) {
			var attack = getAttack(),
				block = getBlock();

			expect(attack.type).toBe('attack');
			expect(block.type).toBe('block');
		}));

		it('should support setting agents by chaining functions', mock.inject(function (perform) {
			var attack = perform.attack(),
				block = perform.block();

			attack.setAttacker('agent1').setDefender('agent2');
			block.setAttacker('agent1').setDefender('agent2');

			expect(attack.attacker).toBe('agent1');
			expect(attack.defender).toBe('agent2');

			expect(block.attacker).toBe('agent1');
			expect(block.defender).toBe('agent2');
		}));

		it('should set the performer property by default', mock.inject(function (perform) {
			var attack = perform.attack().setAttacker('agent1').setDefender('agent2'),
				block = perform.block().setAttacker('agent1').setDefender('agent2');

			expect(attack.performer).toBe('agent1');
			expect(block.performer).toBe('agent2');
		}));
	});
});