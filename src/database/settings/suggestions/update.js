module.exports = Suggestions => async (guildId, options) => {
	options.guildId = guildId;

	return await Suggestions.upsert(options);
};
