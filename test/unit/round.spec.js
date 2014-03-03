var mock = require('ng-di/mock');

require('../../src/round.js');

describe('round', function () {
	beforeEach(mock.module('combat.round'));

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
		var attacker, defender, MockAttack, MockBlock, extraAttacker;

		beforeEach(function () {
			attacker = { name: 'Anubis' };
			defender = { name: 'Bon Jovi' };
			extraAttacker = { name: 'Cicero' };

			MockAttack = function (attacker, defender) {
				this.setInitiative = function () {};
				this.type = 'attack';
				this.attacker = attacker;
				this.defender = defender;
			}

			MockBlock = function (attacker, defender) {
				this.setInitiative = function () {};
				this.type = 'block';
				this.attacker = attacker;
				this.defender = defender;
			}
		});

		it('should be able to pop a block from the block list if it matches an attack', mock.inject(function (newRound) {
			var round = newRound(),
				attack = new MockAttack(attacker, defender),
				block = new MockBlock(attacker, defender),
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
				attack = new MockAttack(extraAttacker, defender),
				block = new MockBlock(attacker, defender),
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
});