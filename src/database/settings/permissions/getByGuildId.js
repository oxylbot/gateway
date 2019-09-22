module.exports = Permissions => async guildId =>
	await Permissions.findAll({ where: { guildId } });
