module.exports = Member => ({
	cache: require("./cache.js")(Member),
	delete: require("./delete.js")(Member),
	getByGuildAndUserID: require("./getByGuildAndUserId.js")(Member)
});
