module.exports = Member => async (guildId, discrim) =>
	await Member.findAll({
		where: {
			guildId,
			discriminator: discrim
		}
	});
