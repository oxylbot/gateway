module.exports = async models => ({
	users: await require("./users/index")(models.User),
	members: await require("./members/index")(models.Member),
	roles: await require("./roles/index")(models.Role),
	guilds: await require("./guilds/index")(models.Guild),
	channels: await require("./channels/index")(models.Channel),
	voiceStates: await require("./voiceStates/index")(models.VoiceState)
});
