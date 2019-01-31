module.exports = models => ({
	users: require("./users/index")(models.User),
	members: require("./members/index")(models.Member),
	roles: require("./roles/index")(models.Role),
	guilds: require("./guilds/index")(models.Guild),
	channels: require("./channels/index")(models.Channel),
	voiceStates: require("./voiceStates/index")(models.VoiceState)
});
