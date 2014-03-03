var di = require('ng-di');

di.module('combat.round', [])

	.factory('newRound', function () {
		function Round() {
			this.actionList = [];
			this.attackList = [];
			this.blockList = [];
		}

		Round.prototype.queueAction = function (action) {
			action.setInitiative();
			this.actionList.push(action);
		};

		return function () {
			return new Round();
		};
	});