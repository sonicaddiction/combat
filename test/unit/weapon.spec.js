var mock = require('ng-di/mock');

require('../../src/weapon.js');

describe('weapon', function () {
	beforeEach(mock.module('combat.weapon'));

	it('should create a weapon with a type', mock.inject(function (getWeapon) {
		var weapon = getWeapon('sword', 'Broad sword');

		expect(weapon.type).toBe('sword');
	}));

	it('should be able to have its damage set', mock.inject(function (getWeapon) {
		var weapon = getWeapon('sword', 'Broad sword', 10);

		expect(weapon.damage).toBe(10);
	}));
});
