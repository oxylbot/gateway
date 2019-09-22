module.exports = Channels => async guildId =>
	await Channels.findByPk(guildId);
