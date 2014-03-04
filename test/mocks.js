var di = require('ng-di');

module.exports = {
	agent: {
		learnSkill: function () {},
		setWeapon: function () {},
		weaponSkillCheck: function () {}
	},
	skill: {
		getSkill: function () {}
	},
	MockAttack: function (attacker, defender) {
		this.setInitiative = function () {};
		this.type = 'attack';
		this.attacker = attacker;
		this.defender = defender;
	},
	MockBlock: function (attacker, defender) {
		this.setInitiative = function () {};
		this.type = 'block';
		this.attacker = attacker;
		this.defender = defender;
	}
};