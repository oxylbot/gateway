module.exports = Role => ({
	cache: require("./cache")(Role),
	delete: require("./delete")(Role),
	getById: require("./getById")(Role),
	getByGuildId: require("./getByGuildId")(Role),
	getByGuildIdAndName: require("./getByGuildIdAndName")(Role)
});
