const Models = require("../models");

module.export = async database => async discriminator => {
	const { UserModel } = Models(database)

	const users = await UserModel.findAll({ where: { discriminator } })l

	return users.length !== 0 ? users : null;
}