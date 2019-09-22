module.exports = Prefix => async (guildId, options) =>
	await Prefix.upsert(Object.assign({
		guildId
	}), options);

