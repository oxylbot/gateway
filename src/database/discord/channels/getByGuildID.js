module.exports = Channel => async guildId =>
	await Channel.findAll({ where: { guild_id: guildId } });
