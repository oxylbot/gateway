module.exports = models => ({
	autorole: require("./autorole/index")(models.AutoRole),
	autorolebot: require("./autorolebot/index")(models.AutoRoleBot),
	censors: require("./censors/index")(models.Censor),
	channels: require("./channels/index")(models.Channels),
	modlog: require("./modlog/index")(models.ModLog),
	music: require("./music/index")(models.Music),
	permissions: require("./permissions/index")(models.Permissions),
	prefix: require("./prefix/index")(models.Prefix),
	reddit: require("./reddit/index")(models.Reddit),
	roleme: require("./roleme/index")(models.RoleMe),
	suggestions: require("./suggestions/index")(models.Suggestions),
	twitch: require("./twitch/index")(models.Twitch)
});
