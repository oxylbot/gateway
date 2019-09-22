module.exports = AutoRole => async guildId =>
	await AutoRole.findByPk(guildId);
