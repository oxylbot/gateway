module.exports = ModLog => async guildId =>
	await ModLog.findByPk(guildId);
