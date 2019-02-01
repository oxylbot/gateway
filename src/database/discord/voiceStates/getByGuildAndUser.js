module.exports = VoiceState => async (guildId, userId) =>
	await VoiceState.findOne({
		where: {
			guildId,
			userId
		}
	});
