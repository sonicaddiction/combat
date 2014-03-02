var di = require('ng-di');

di.module('combat.action', ['combat.dice'])

	.factory('Action', function (d100) {
		return function (name, performer) {
			this.name = name;
			this.performer = performer;
			this.callback = null;
			this.success = null;
			this.fail = null;
			this.createSetChain = function (valueMap) {
				var action = this,
					head = valueMap[0],
					tail = valueMap.slice(1);

				function nextLevel(parent, valMap, context) {
					var head = valMap[0],
						tail = valMap.slice(1),
						newContext = {};

					return function (value) {
						action[parent.value] = value;

						if (valMap.length) {
							newContext[head.name] = nextLevel(head, tail, newContext);
							return newContext;
						} else {
							return action;
						}
					}
				}

				action[head.name] = nextLevel(head, tail, action);
			};
		};
	});