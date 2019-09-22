module.exports = ModLog => async (guildId, options) =>
	await ModLog.upsert(Object.assign({
		guildId
	}), options);

