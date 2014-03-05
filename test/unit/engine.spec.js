var mock = require('ng-di/mock'),
	getEngine;

require('../../src/engine.js');

describe('combat.engine', function () {
	beforeEach(mock.module('combat.engine'));

	beforeEach(mock.module(function ($provide) {
		$provide.value('d20', function () {
			return 10;
		});
	}));

	describe('getEngine', function () {
		it('should create an object', mock.inject(function (getEngine) {
			var engine = getEngine();

			expect(engine).toBeDefined();
		}));

		it('should initially contain no agents', mock.inject(function (getEngine) {
			var engine = getEngine(),
				agents = Object.keys(engine.agents);

			expect(agents.length).toBe(0);
		}));

		it('should be able to add agents', mock.inject(function (getEngine) {
			var engine = getEngine(),
				mockAgent0 = {
					id: 0
				},
				mockAgent1 = {
					id: 1
				};

			engine.addAgent(mockAgent0);
			engine.addAgent(mockAgent1);

			expect(Object.keys(engine.agents).length).toBe(2);
		}));

		it('should not add the same agent twice', mock.inject(function (getEngine) {
			var engine = getEngine(),
				mockAgent = {
					id: 0
				},
				addSameAgentAgain = function () {
					engine.addAgent(mockAgent);
				};

			engine.addAgent(mockAgent);

			expect(addSameAgentAgain).toThrow(new Error('Agent already exists'));
		}));
	});
});
