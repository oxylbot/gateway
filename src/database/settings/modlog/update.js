module.exports = ModLog => async (guildId, options) => {
	options.guildId = guildId;

	return await ModLog.upsert(options);
};

