var di = require('ng-di');

di.module('combat.dice', [])

	.factory('d6', function () {
		return function () {
			return Math.ceil(Math.random() * 6);
		};
	})

	.factory('d100', function () {
		return function () {
			return Math.ceil(Math.random() * 100);
		};
	});