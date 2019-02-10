module.exports = Channel => ({
	cache: require("./cache.js")(Channel),
	getByGuildId: require("./getByGuildId.js")(Channel),
	getById: require("./getById.js")(Channel),
	delete: require("./delete.js")(Channel)
});
