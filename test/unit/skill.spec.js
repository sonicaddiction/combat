var mock = require('ng-di/mock'),
	di = require('ng-di');

require('../../src/skill.js');

di.module('combat.dice', []);

describe('skill', function () {
	beforeEach(mock.module('combat.skill'));

	beforeEach(mock.module(function ($provide) {
		$provide.value('d20', function () {
			return 10;
		});
	}));

	it('should succeed when roll is beneath or equal to its skillValue', mock.inject(function (getSkill) {
		var skill = getSkill('jump', 10);

		console.log(skill);

		expect(skill.skillCheck()).toBeTruthy();
	}));

	it('should fail when roll is beneath or equal to its skillValue', mock.inject(function (getSkill) {
		var skill = getSkill('jump', 9);

		console.log(skill);

		expect(skill.skillCheck()).toBeFalsy();
	}));
});