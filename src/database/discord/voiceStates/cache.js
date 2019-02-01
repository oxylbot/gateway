module.exports = VoiceState => async voiceState =>
	await VoiceState.upsert(voiceState);
