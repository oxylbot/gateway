module.exports = VoiceState => async channelId =>
	await VoiceState.findAll({ where: { channelId } });
