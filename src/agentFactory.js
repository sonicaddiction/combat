var Agent = require('./agent.js'),
	ActionFactory = require('./actionFactory.js');

function getFighter (name) {
	var fighter = Agent.getAgent(name, 10);
	fighter.type = 'fighter';

	fighter.learnAction(ActionFactory.performAttack(fighter));

	return fighter;
}

module.exports = {
	getFighter: getFighter
};