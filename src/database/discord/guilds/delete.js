const Models = require("../models");

module.exports = async database => async id => {
	const { GuildModel } = Models(database);

	try {
		return await GuildModel.destroy({ where: { id } });
	} catch (error) {
		console.log(error);
	}
}