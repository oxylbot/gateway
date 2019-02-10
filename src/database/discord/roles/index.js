module.exports = Role => ({
	cache: require("./cache.js")(Role),
	delete: require("./delete.js")(Role),
	getById: require("./getById.js")(Role),
	getByGuildId: require("./getByGuildId")(Role)
});
