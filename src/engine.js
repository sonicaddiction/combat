var di = require('ng-di');

di.module('combat.engine', [])

	.factory('getEngine', function () {
		var Engine = function () {
			this.agents = {};
			this.actionQueue = [];
		};

		Engine.prototype.addAgent = function (agent) {
			if (this.agents[agent.id]) {
				throw new Error('Agent already exists');
			} else {
				this.agents[agent.id] = agent;
			}
		};

		Engine.prototype.queueAction = function (action) {
			this.actionQueue.push(action);
		};

		Engine.prototype.step = function () {
			var currentAction = this.actionQueue.shift();

			currentAction.perform();
		};

		return function () {
			return new Engine();
		};
	});