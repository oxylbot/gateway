module.exports = async client => ({
	cache: await require("./cache")(client),
	getByID: await require("./getByID")(client),
	getByGuildID: await require("./getByGuildID")(client),
	delete: await require("./delete")(client)
});
