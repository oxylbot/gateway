module.exports = database => ({
	ChannelModel: require("./Channels.js")(database),
	GuildModel: require("./Guilds.js")(database),
	MemberModel: require("./Members.js")(database),
	RoleModel: require("./Roles.js")(database),
	UserModel: require("./Users.js")(database),
	VoiceStateMode: require("./VoiceStates.js")(database)
});
