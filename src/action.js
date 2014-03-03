var di = require('ng-di');

di.module('combat.action', [])

	.factory('getAction', function () {
		function Action(type) {
			this.type = type;
			this.priority = -Number.MAX_VALUE;
		}

		Action.prototype.setPriority = function(priority) {
			this.priority = priority;
		};

		return function (type) {
			return new Action(type);
		};
	})

	.factory('getAttack', function (getAction) {
		return function () {
			return getAction('attack');
		};
	})

	.factory('getBlock', function (getAction) {
		return function () {
			return getAction('block');
		};
	});