module.exports = Music => async (guildId, options) => {
	options.guildId = guildId;

	return await Music.upsert(options);
};

