var mock = require('ng-di/mock');

require('../../src/damage.js');

describe('combat.damage', function () {
	beforeEach(mock.module('combat.damage'));

	describe('getDamage', function () {
		it('should return a Damage object', mock.inject(function (getDamage) {
			var damage = getDamage({});

			expect(damage).toBeDefined();
		}));

		it('should return a numeric damage value', mock.inject(function (getDamage) {
			var damageDice = { roll: jasmine.createSpy().andReturn(1) },
				damage = getDamage(damageDice);

			expect(damage.roll()).toBe(1);
		}));
	});
});