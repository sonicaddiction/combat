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

			console.log('Round:', round);
		};

		Engine.prototype.step = function () {
			var currentAction = this.actionQueue.shift(),
				actionInfo = currentAction.getInfo();

			switch(actionInfo.type) {
				case 'attack':
					console.log('Attack:', actionInfo);
					break;
				case 'block':
					console.log('Block:', actionInfo);
					break;
				default:
					console.log('Other action:', actionInfo);
			};
		};

		return function () {
			return new Engine();
		};
	});