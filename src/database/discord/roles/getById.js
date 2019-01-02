const Models = require("../models");

module.exports = async database => async id => {
	const { RoleModel } = Models(database);

	const roles = await RoleModel.findAll({ where: { id } });

	return roles.length !== 0 ? roles : null;
}