module.exports = async VoiceState => ({
	cache: await require("./cache")(VoiceState),
	getByGuildAndUserID: await require("./getByGuildAndUser")(VoiceState),
	getByChannelID: await require("./getByChannelId")(VoiceState),
	delete: await require("./delete")(VoiceState)
});
