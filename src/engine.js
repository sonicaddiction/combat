var di = require('ng-di');

di.module('combat.engine', ['combat.round'])

	.factory('getEngine', function (newRound) {
		var Engine = function () {
			this.agents = {};
		};

		Engine.prototype.addAgent = function (agent) {
			if (this.agents[agent.id]) {
				throw new Error('Agent already exists');
			} else {
				this.agents[agent.id] = agent;
			}
		};

		Engine.prototype.newRound = function (setupRoundCallback) {
			var round = newRound();

			setupRoundCallback(round.queueAction());

			round.setupCombat();

			round.performAttacks();
		};

		return function () {
			return new Engine();
		};
	});