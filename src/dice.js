var di = require('ng-di');

di.module('combat.dice', [])

	.factory('randomValue', function () {
		return Math.random;
	})

	.factory('diceFormatParser', function () {
		return function (format) {
			var array = format.split(/d|\+/);

			return {
				dice: ~~array[0],
				sides: ~~array[1],
				modification: ~~array[2]
			};
		};
	})

	.factory('customDice', function (diceFormatParser, randomValue) {
		function Dice(dice, sides, modification) {
			this.dice = dice;
			this.sides = sides;
			this.modification = modification;
		}

		Dice.prototype.roll = function () {
			var i,
				sum = 0;

			for (i = 0; i < this.dice; i++) {
				sum = sum + Math.floor(randomValue() * this.sides) + 1;
			}

			return sum + this.modification;
		};

		return function (diceFormat) {
			var f = diceFormatParser(diceFormat),
				dice = new Dice(f.dice, f.sides, f.modification);

			return dice;
		};
	})

	.factory('d6', function (randomValue) {
		return function () {
			return Math.ceil(randomValue() * 6);
		};
	})

	.factory('d20', function (randomValue) {
		return function () {
			return Math.ceil(randomValue() * 20);
		};
	})

	.factory('d100', function (randomValue) {
		return function () {
			return Math.ceil(randomValue() * 100);
		};
	});