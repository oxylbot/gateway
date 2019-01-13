const Models = require("../../models");

module.exports = async database => async discriminator => {
	const { UserModel } = Models(database);

	const users = await UserModel.findAll({ where: { discriminator } });

	return users.length !== 0 ? users : null;
};
