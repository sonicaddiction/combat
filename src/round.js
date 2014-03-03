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

		Round.prototype.performAttack = function (attack) {
			var successfullAttack = attack.attacker.weaponSkillCheck();
		};

		return function () {
			return new Round();
		};
	});