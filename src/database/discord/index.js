module.exports = database => ({
	users: await require("./users/index")(database),
	members: await require("./members/index")(database),
	roles: await require("./roles/index")(database),
	guilds: await require("./guilds/index")(database),
	channels: await require("./channels/index")(database),
	voiceStates: await require("./voiceStates/index")(database)
});
