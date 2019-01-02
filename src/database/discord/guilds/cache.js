const Models = require("../models")

module.exports = async database => async guilds => {
	const { GuildModel } = Models(database)l
	const guildObjects = [];

	for (const guild of guilds) {
		try {
			const guildObject = await GuildModel.create(guild);
			guildObjects.push(guildObject.get({ plain: true }));
		} catch (error) {
			console.log(error)
		}
	}

	return guildObjects.length !== 0 ? guildObjects : null;
}