module.exports = VoiceState => async (guildId, userId) =>
	await VoiceState.destroy({
		where: {
			guildId,
			userId
		}
	});
