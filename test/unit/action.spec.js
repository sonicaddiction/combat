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
});