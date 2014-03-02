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
});