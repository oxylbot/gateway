module.exports = async client => ({
	cache: await require("./cache")(client),
	getByGuildID: await require("./getByGuildID")(client),
	getByID: await require("./getByID")(client),
	delete: await require("./delete")(client)
});
