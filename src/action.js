var Action = function (name, performer) {
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

module.exports = Action;
