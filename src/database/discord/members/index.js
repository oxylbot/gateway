module.exports = Member => ({
	cache: require("./cache.js")(Member),
	delete: require("./delete.js")(Member),
	getByGuildAndUserId: require("./getByGuildAndUserId.js")(Member)
});
