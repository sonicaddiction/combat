var di = require('ng-di');

di.module('combat.weapon', [])
	.factory('getWeapon', function () {
		function Weapon(type, name, damage) {
			this.type = type;
			this.name = name;
			this.damage = damage;
		}

		return function (type, name, damage) {
			return new Weapon(type, name, damage);
		};
	});