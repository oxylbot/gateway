module.exports = Censor => async guildId =>
	await Censor.findAll({ where: { guildId } });
