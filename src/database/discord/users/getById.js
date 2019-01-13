const Models = require("../../models");

module.exports = async database => async id => {
	const { UserModel } = Models(database);

	const users = await UserModel.findAll({ where: { id } });

	return users.length !== 0 ? users : null;
};
