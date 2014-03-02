var mock = require('ng-di/mock'),
	di = require('ng-di');

require('../../src/action.js');

di.module('combat.dice', []);

describe('actions', function () {
	beforeEach(mock.module('combat.action'));

	beforeEach(mock.module(function ($provide) {
		$provide.value('d100', function () {
			return 50;
		});
	}));

	it('should be able to perform an action and succeed', mock.inject(function (Action) {
		var action = new Action('jump', {
			skills: {
				jump: 60
			}
		});

		action.success = jasmine.createSpy('success');
		action.fail = jasmine.createSpy('fail');

		action.perform();

		expect(action.success).toHaveBeenCalled();
		expect(action.fail).not.toHaveBeenCalled();
	}));

	it('should be able to perform an action and fail', mock.inject(function (Action) {
		var action = new Action('jump', {
			skills: {
				jump: 40
			}
		});

		action.success = jasmine.createSpy('success');
		action.fail = jasmine.createSpy('fail');

		action.perform();

		expect(action.fail).toHaveBeenCalled();
		expect(action.success).not.toHaveBeenCalled();
	}));

	describe('setter function chain generator', function () {
		var setterChain,
			performer;

		beforeEach(function () {
			performer = {
				skills: {
					jump: 60
				}
			};

			setterChain = [
				{
					name: 'from',
					value: 'startPosition'
				},
				{
					name: 'andLandOn',
					value: 'landingPosition'
				}
			];
		});

		it('should be able to generate a chain of setter functions', mock.inject(function (Action) {
			var action = new Action('jump', performer);

			action.createSetChain(setterChain);

			expect(typeof action.from).toBe('function');
			expect(typeof action.from('bridge').andLandOn).toBe('function');
		}));

		it('should return the action object from the last function', mock.inject(function (Action) {
			var action = new Action('jump', performer);

			action.createSetChain(setterChain);

			expect(action.from('bridge').andLandOn('cat')).toBe(action);
		}));
	});
});