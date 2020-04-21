module.exports = Suggestions => async (guildId, options) =>
	await Suggestions.upsert(Object.assign({
		guildId
	}), options);

