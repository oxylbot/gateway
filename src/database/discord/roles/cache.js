const Models = require("../models");

module.exports = async database => async roles => {
	const { RoleModel } = Models(database);
	const roleObjects = [];

	for(const role of roles) {
		try {
			const roleObject = await RoleModel.create(role);
			roleObjects.push(roleObject.get({ plain: true }));
		} catch(error) {
			console.log(error);
		}
	}

	return roleObjects.length !== 0 ? roleObjects : null;
};
