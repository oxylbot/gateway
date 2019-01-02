const Models = require("../models");

module.exports = async database => async channels => {
	const { RoleModel } = Models(database);
	const roleObjects = [];

	for (const role of channels) {
		try {
			const roleObject = await RoleModel.create(role);
			roleObjects.push(roleObject.get({ plain: true }));
		} catch (error) {
			console.log(error)
		}
	}
}