module.exports = Music => async (guildId, options) =>
	await Music.upsert(Object.assign({
		guildId
	}), options);

