module.exports = Prefix => async guildId =>
	await Prefix.findByPk(guildId);
