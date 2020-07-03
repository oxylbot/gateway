module.exports = Prefix => async (guildId, options) => {
	options.guildId = guildId;

	return await Prefix.upsert(options);
};

