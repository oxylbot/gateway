const Models = require("../models");

module.exports = async database => async id => {
	const { RoleModel } = Models(database);

	return await RoleModel.destroy({ where: { id } });
};
