module.exports = Channel => ({
	cache: require("./cache")(Channel),
	getByGuildId: require("./getByGuildId")(Channel),
	getByGuildIdAndName: require("./getByGuildIdAndName")(Channel),
	getById: require("./getById")(Channel),
	delete: require("./delete")(Channel)
});
