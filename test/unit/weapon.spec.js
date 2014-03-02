var mock = require('ng-di/mock');

require('../../src/weapon.js');

describe('weapon', function () {
	beforeEach(mock.module('combat.weapon'));

	it('should create a weapon with a name', mock.inject(function (getWeapon) {
		var weapon = getWeapon('sword');

		expect(weapon.name).toBe('sword');
	}));

	it('should be able to have its damage set', mock.inject(function (getWeapon) {
		var weapon = getWeapon('sword', 10);

		expect(weapon.damage).toBe(10);
	}));

	it('should have increasing id numbers', mock.inject(function (getWeapon) {
		var weapon1 = getWeapon('sword'),
			weapon2 = getWeapon('club');

		expect(weapon1.id).toBeLessThan(weapon2.id);
	}));
});
