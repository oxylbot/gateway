const Models = require("../../models");

module.exports = async database => async roles => {
	const { RoleModel } = Models(database);
	const roleObjects = [];

	for(const role of roles) {
		const roleObject = await RoleModel.create(role);
		roleObjects.push(roleObject.get({ plain: true }));
	}

	return roleObjects.length !== 0 ? roleObjects : null;
};
