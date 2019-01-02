module.exports = async database => ({
	cache: await require("./cache.js")(database),
	delete: await require("./delete.js")(database),
	getById: await require("./getById.js")(database),
	getByGuildId: await require("./getByGuildId")(database)
});
