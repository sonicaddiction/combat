var di = require('ng-di');

di.module('combat.action', [])

	.factory('Action', function () {
		return function (name, performer) {
			this.name = name;
			this.performer = performer;
			this.callback = null;
			this.perform = function (modification) {
				var skillValue = this.performer.skills[this.name],
					roll = Math.ceil(Math.random() * 100);

				if (modification) {
					skillValue = skillValue + modification;
				}

				if (skillValue > roll) {
					this.success();
				} else {
					this.fail();
				}
			};
		};
	});