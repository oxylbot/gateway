module.exports = async database => ({
	cache: await require("./cache")(database),
	getByGuildAndUserID: await require("./getByGuildAndUser")(database),
	getByChannelID: await require("./getByChannelId")(database),
	delete: await require("./delete")(database)
});
