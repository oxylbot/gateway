module.exports = async database => ({
	cache: await require("./cache.js")(database),
	delete: await require("./delete.js")(database),
	getByGuildAndUserID: require("./getByGuildAndUserId.js")(database)
});
