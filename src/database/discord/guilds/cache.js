const Models = require("../../models");

module.exports = async database => async guilds => {
	const { GuildModel } = Models(database);
	const guildObjects = [];

	for(const guild of guilds) {
		const guildObject = await GuildModel.create(guild);
		guildObjects.push(guildObject.get({ plain: true }));
	}

	return guildObjects.length !== 0 ? guildObjects : null;
};
