module.exports = async database => ({
	cache: await require("./cache.js")(database),
	delete: await require("./delete.js")(database),
	getByID: await require("./getById.js")(database),
	getByGuildID: await require("./getByGuildId")(database)
});
