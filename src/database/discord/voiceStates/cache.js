module.exports = VoiceState => async voiceStates =>
	await Promise.all(voiceStates.map(voiceState => VoiceState.upsert(voiceState)));
