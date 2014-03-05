var di = require('ng-di');

di.module('combat.round', [])

	.factory('newRound', function () {
		function Round() {
			this.actionList = [];
			this.attackList = [];
			this.blockList = [];
		}

		Round.prototype.queueAction = function () {
			var round = this;

			return function (action) {
				action.setInitiative();
				round.actionList.push(action);
			}
		};

		Round.prototype.setupCombat = function () {
			var round = this;

			this.actionList.sort(function (a, b) {
				return a.initiative - b.initiative;
			});

			this.actionList.forEach(function (action) {
				switch(action.type) {
					case 'attack':
						round.attackList.push(action);
						break;
					case 'block':
						round.blockList.push(action);
						break;
					default:
						console.log('Other action:', action);
				};
			});
		};

		Round.prototype.popEligibleBlocks = function (attack) {
			var blockExists,
				foundBlock,
				round = this;

			blockExists = this.blockList.some(function (block, index) {
				if ((block.attacker === attack.attacker) && block.defender === attack.defender) {
					foundBlock = block;
					round.blockList.splice(index, 1);
					return true;
				}
			});

			if (blockExists) {
				return foundBlock;
			} else {
				return null;
			}

		};

		Round.prototype.performAttacks = function () {
			var round = this;
			this.attackList.forEach(function (attack) {
				round.performAttack(attack);
			});
		};

		Round.prototype.dealDamage = function (agent, weapon) {
			var damage = weapon.damage;

			agent.recieveDamage(damage);

			this.checkForDeath(agent);
		};

		Round.prototype.checkForDeath = function (agent) {
			if (agent.hp < 0) {
				console.log(agent.name, 'dies from the wounds');
				agent.status.dead = true;
			}
		};

		Round.prototype.performAttack = function (attack) {
			var successfullAttack,
				successfulBlock,
				attacker = attack.attacker,
				defender = attack.defender;

			if (attacker.status.dead) {
				console.log(attacker.name, 'is dead and can´t attack');
				return;
			}

			successfullAttack = attacker.weaponSkillCheck();
			if (this.popEligibleBlocks(attack)) {
				successfulBlock = defender.weaponSkillCheck();
			}

			if (successfullAttack && ! successfulBlock) {
				console.log(attacker.name, 'hits', defender.name);
				this.dealDamage(defender, attacker.weapon);
			} else if (successfullAttack && successfulBlock) {
				console.log(defender.name, 'blocks the attack of', attacker.name);
			} else if (!successfullAttack && successfulBlock) {
				console.log(defender.name, 'deftly avoids the attack and gains an extra action');
			} else {
				console.log('Both fighters stumble around each other clumsily');
			}
		};

		return function () {
			return new Round();
		};
	});