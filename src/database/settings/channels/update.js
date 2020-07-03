module.exports = Channels => async (guildId, options) => {
	options.guildId = guildId;

	return await Channels.upsert(options);
};
