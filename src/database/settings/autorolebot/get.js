module.exports = AutoRoleBot => async guildId =>
	await AutoRoleBot.findByPk(guildId);
