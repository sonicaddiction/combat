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

		Round.setupCombat = function () {

		};

		return function () {
			return new Round();
		};
	});