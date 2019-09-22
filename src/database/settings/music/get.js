module.exports = Music => async guildId =>
	await Music.findByPk(guildId);
