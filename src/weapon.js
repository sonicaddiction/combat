var di = require('ng-di');

di.module('combat.weapon', [])

	.value('currentId', 0)

	.factory('getWeapon', function (currentId) {
		function Weapon(id, name, damage) {
			this.id = id;
			this.name = name;
			this.damage = damage;
		}

		return function (name, damage) {
			return new Weapon(currentId++, name, damage);
		};
	});