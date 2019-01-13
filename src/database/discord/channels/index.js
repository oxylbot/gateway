module.exports = async database => ({
	cache: await require("./cache.js")(database),
	getByGuildID: await require("./getByGuildID.js")(database),
	getById: await require("./getById.js")(database),
	delete: await require("./delete.js")(database)
});
