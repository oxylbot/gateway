module.exports = Suggestions => async guildId =>
	await Suggestions.findByPk(guildId);
