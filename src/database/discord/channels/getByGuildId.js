module.exports = Channel => async guildId =>
	await Channel.findAll({ where: { guildId } });
