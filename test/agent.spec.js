var Agent = require('../src/agent.js');

module.exports.create = function (test) {
	var agent = Agent.getAgent('Adam');

	test.equal(agent.name, 'Adam');
	test.equal(agent.hp, undefined);

	test.done();
};