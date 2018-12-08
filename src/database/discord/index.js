module.exports = async client => ({
	users: await require("./users/index")(client),
	members: await require("./members/index")(client),
	roles: await require("./roles/index")(client),
	guilds: await require("./guilds/index")(client),
	channels: await require("./channels/index")(client),
	voiceStates: await require("./voiceStates/index")(client)
});
