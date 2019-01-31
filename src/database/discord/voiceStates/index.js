module.exports = async VoiceState => ({
	cache: require("./cache")(VoiceState),
	getByGuildAndUserID: require("./getByGuildAndUser")(VoiceState),
	getByChannelID: require("./getByChannelId")(VoiceState),
	delete: require("./delete")(VoiceState)
});
