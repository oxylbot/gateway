const Models = require("../../models");

module.exports = async database => async username => {
	const { UserModel } = Models(database);

	const users = await UserModel.findAll({ where: { username } });

	return users.length !== 0 ? users : null;
};
