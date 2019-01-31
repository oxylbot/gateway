module.exports = Channel => ({
	cache: require("./cache.js")(Channel),
	getByGuildID: require("./getByGuildId.js")(Channel),
	getById: require("./getById.js")(Channel),
	delete: require("./delete.js")(Channel)
});
