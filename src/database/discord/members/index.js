module.exports = async client => ({
	cache: await require("./cache")(client),
	getByGuildAndUserID: await require("./getByGuildAndUserID")(client),
	delete: await require("./delete")(client)
});
