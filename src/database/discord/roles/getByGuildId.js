const Models = require("../../models");

module.exports = async database => async guild_id => {
	const { RoleModel } = Models(database);

	const roles = await RoleModel.findAll({ where: { guild_id } });

	return roles.length !== 0 ? roles : null;
};
