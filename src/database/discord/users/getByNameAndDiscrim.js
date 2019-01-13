const Models = require("../../models");

module.exports = async database => async (username, discriminator) => {
	const { UserModel } = Models(database);

	const users = await UserModel.findAll({ where: { username,
		discriminator } });

	return users.length !== 0 ? users : null;
};
