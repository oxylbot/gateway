module.exports = async Member => ({
	cache: await require("./cache.js")(Member),
	delete: await require("./delete.js")(Member),
	getByGuildAndUserID: require("./getByGuildAndUserId.js")(Member)
});
