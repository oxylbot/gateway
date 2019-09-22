module.exports = UserLog => async guildId =>
	await UserLog.findByPk(guildId);
