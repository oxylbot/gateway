module.exports = UserLog => async (guildId, options) =>
	await UserLog.upsert(Object.assign({
		guildId
	}), options);

