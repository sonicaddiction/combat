var mock = require('ng-di/mock');

require('../../src/dice.js');

describe('combat.dice', function () {
	var randomNumber = jasmine.createSpy();
	beforeEach(mock.module('combat.dice'));

	describe('customDice', function () {
		beforeEach(mock.module(function ($provide) {
			$provide.value('randomValue', randomNumber);
			randomNumber
		}));

		it('should return a pseudo random number', mock.inject(function (customDice) {
			var dice = customDice('1d6+1'),
				roll;

			randomNumber.andReturn(0);
			roll = dice.roll();
			expect(roll).toBe(2);

			randomNumber.andReturn(0.999999999);
			roll = dice.roll();
			expect(roll).toBe(7);
		}));
	});

	describe('diceFormatParser', function () {
		it('should parse a dice value', mock.inject(function (diceFormatParser) {
			var parsedObject = diceFormatParser('1d6+2');

			expect(parsedObject.dice).toBe(1);
			expect(parsedObject.sides).toBe(6);
			expect(parsedObject.modification).toBe(2);
		}));

		it('should parse formats with no modification', mock.inject(function (diceFormatParser) {
			var parsedObject = diceFormatParser('2d20');

			expect(parsedObject.dice).toBe(2);
			expect(parsedObject.sides).toBe(20);
			expect(parsedObject.modification).toBe(0);
		}));
	});
});