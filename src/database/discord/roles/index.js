module.exports = Role => ({
	cache: require("./cache.js")(Role),
	delete: require("./delete.js")(Role),
	getByID: require("./getById.js")(Role),
	getByGuildID: require("./getByGuildId")(Role)
});
