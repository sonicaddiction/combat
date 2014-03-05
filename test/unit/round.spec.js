var mock = require('ng-di/mock'),
	mockData = require('../mocks.js');

require('../../src/round.js');

describe('combat.round', function () {
	beforeEach(mock.module('combat.round'));

	describe('newRound', function () {
		it('should set up a round with empty action, block and attack lists', mock.inject(function (newRound) {
			var round = newRound();

			expect(round.actionList.length).toBe(0);
			expect(round.attackList.length).toBe(0);
			expect(round.blockList.length).toBe(0);
		}));

		it('should be able to queue actions', mock.inject(function (newRound) {
			var round = newRound(),
				spy1 = jasmine.createSpy(),
				spy2 = jasmine.createSpy();

			round.queueAction()({ setInitiative: spy1 });
			round.queueAction()({ setInitiative: spy2 });


			expect(round.actionList.length).toBe(2);
			expect(spy1).toHaveBeenCalled();
			expect(spy2).toHaveBeenCalled();
		}));

		it('should be able to sort actions into attack and block lists', mock.inject(function (newRound) {
			var round = newRound();

			round.queueAction()({
				setInitiative: function () {},
				type: 'attack'
			});
			round.queueAction()({
				setInitiative: function () {},
				type: 'attack'
			});
			round.queueAction()({
				setInitiative: function () {},
				type: 'block'
			});

			expect(round.attackList.length).toBe(0);
			expect(round.blockList.length).toBe(0);

			round.setupCombat();

			expect(round.attackList.length).toBe(2);
			expect(round.blockList.length).toBe(1);
		}));

		describe('popEligibleBlocks', function () {
			var attacker, defender, extraAttacker;

			beforeEach(function () {
				attacker = { name: 'Anubis' };
				defender = { name: 'Bon Jovi' };
				extraAttacker = { name: 'Cicero' };
			});

			it('should be able to pop a block from the block list if it matches an attack', mock.inject(function (newRound) {
				var round = newRound(),
					attack = new mockData.MockAttack(attacker, defender),
					block = new mockData.MockBlock(attacker, defender),
					retrievedBlock;

				round.queueAction()(attack);
				round.queueAction()(block);

				round.setupCombat();

				expect(round.blockList.length).toBe(1);

				retrievedBlock = round.popEligibleBlocks(attack);

				expect(retrievedBlock).toBe(block);
				expect(round.blockList.length).toBe(0);
			}));

			it('should not find any blocks if the blocker doesn´t match', mock.inject(function (newRound) {
				var round = newRound(),
					attack = new mockData.MockAttack(extraAttacker, defender),
					block = new mockData.MockBlock(attacker, defender),
					retrievedBlock;

				round.queueAction()(attack);
				round.queueAction()(block);

				round.setupCombat();

				expect(round.blockList.length).toBe(1);

				retrievedBlock = round.popEligibleBlocks(attack);

				expect(retrievedBlock).toBeNull();
				expect(round.blockList.length).toBe(1);
			}));
		});

		describe('performAttack', function () {
			var attacker,
				defender,
				round;

			beforeEach(mock.inject(function (newRound) {
				attacker = {
					name: 'Anubis', weaponSkillCheck: jasmine.createSpy('attacker weaponSkillCheck'),
					recieveDamage: jasmine.createSpy('attacker recieveDamage'),
					status: {},
					weapon: {}
				};
				defender = {
					name: 'Balusifer', weaponSkillCheck: jasmine.createSpy('defender weaponSkillCheck'),
					recieveDamage: jasmine.createSpy('defender recieveDamage'),
					status: {},
					weapon: {}
				};
				round = newRound();
			}));

			it('should hit if the attacker succeeds and the blocker fails', function () {
				attack = new mockData.MockAttack(attacker, defender);
				block = new mockData.MockBlock(attacker, defender);

				attacker.weaponSkillCheck.andReturn(true);
				defender.weaponSkillCheck.andReturn(false);

				round.queueAction()(attack);
				round.queueAction()(block);

				round.setupCombat();

				round.performAttacks();

				expect(defender.recieveDamage).toHaveBeenCalled();
			});

			it('should apply damage to an agent', function () {
				var weapon = {
						damage: 1
					},
					agent = {
						recieveDamage: jasmine.createSpy()
					};

				round.dealDamage(agent, weapon);

				expect(agent.recieveDamage).toHaveBeenCalled();
			});

			it('should check if an agent is alive or not', function () {
				var deadAgent = { hp: -1, status: {} },
					almostDead = { hp: 0, status: {} },
					aliveAgent = { hp: 1, status: {} }

				round.checkForDeath(deadAgent);
				round.checkForDeath(almostDead);
				round.checkForDeath(aliveAgent);

				expect(deadAgent.status.dead).toBeTruthy();
				expect(almostDead.status.dead).toBeFalsy();
				expect(aliveAgent.status.dead).toBeFalsy();
			});
		});
	});
});