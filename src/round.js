var di = require('ng-di');

di.module('combat.round', [])

	.factory('newRound', function () {
		function Round() {
			this.actionList = [];
			this.attackList = [];
			this.blockList = [];
		}

		Round.prototype.addAction = function (action) {

		};

		return function () {
			return new Round();
		};
	});