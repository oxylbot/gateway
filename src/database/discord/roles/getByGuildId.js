const Models = require("../models");

module.exports = async database => async guild_id => {
	const { RoleModel } = Models(database);

	const roles = await RoleModel.findAll({ where: { guild_id } });

	return channels.length !== 0 ? channels : null;
}