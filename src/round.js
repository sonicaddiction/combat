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

		return function () {
			return new Round();
		};
	});