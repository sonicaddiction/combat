var di = require('ng-di');

di.module('combat.damage', [])
	.factory('getDamage', function () {
		function Damage(damageDice) {
			this.damageDice = damageDice;
		}

		Damage.prototype.roll = function () {
			return this.damageDice.roll();
		};

		return function (damageDice) {
			return new Damage(damageDice);
		}
	});
