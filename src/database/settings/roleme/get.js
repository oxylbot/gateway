module.exports = RoleMe => async guildId =>
	await RoleMe.findByPk(guildId);
