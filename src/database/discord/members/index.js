module.exports = async database => ({
	cache: await require("./cache.js")(database),
	delete: await require("./delete.js")(database),
	getByGuildAndUserId: require("./getByGuildAndUserId.js")(database)
});
