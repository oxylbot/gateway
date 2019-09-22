module.exports = Channels => async (guildId, options) =>
	await Channels.upsert(Object.assign({
		guildId
	}), options);

