var mock = require('ng-di/mock'),
	di = require('ng-di');

require('../../src/skill.js');

describe('combat.skill', function () {
	beforeEach(mock.module('combat.skill'));

	beforeEach(mock.module(function ($provide) {
		$provide.value('d20', function () {
			return 10;
		});
	}));

	describe('getSkill', function () {
		it('should succeed when roll is beneath or equal to its skillValue', mock.inject(function (getSkill) {
			var skill = getSkill('jump', 10);

			expect(skill.skillCheck()).toBeTruthy();
		}));

		it('should fail when roll is beneath or equal to its skillValue', mock.inject(function (getSkill) {
			var skill = getSkill('jump', 9);

			expect(skill.skillCheck()).toBeFalsy();
		}));

		it('should be able to report relative success', mock.inject(function (getSkill) {
			var skill1 = getSkill('jump', 5),
				skill2 = getSkill('jump', 10),
				skill3 = getSkill('jump', 15);

			expect(skill1.skillCheckDiff()).toBe(-5);
			expect(skill2.skillCheckDiff()).toBe(0);
			expect(skill3.skillCheckDiff()).toBe(5);
		}));
	});
});