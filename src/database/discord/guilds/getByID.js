const Models = require("../../models");

module.exports = async database => async id => {
	const { GuildModel } = Models(database);

	const guilds = await GuildModel.findAll({ where: { id } });

	return guilds.length !== 0 ? guilds : null;
};
