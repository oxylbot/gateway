module.exports = VoiceState => ({
	cache: require("./cache")(VoiceState),
	getByGuildAndUserId: require("./getByGuildAndUser")(VoiceState),
	getByChannelId: require("./getByChannelId")(VoiceState),
	delete: require("./delete")(VoiceState)
});
