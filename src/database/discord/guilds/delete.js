const Models = require("../../models");

module.exports = async database => async id => {
	const { GuildModel } = Models(database);

	return await GuildModel.destroy({ where: { id } });
};
