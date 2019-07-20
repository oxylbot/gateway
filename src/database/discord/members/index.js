module.exports = Member => ({
	cache: require("./cache")(Member),
	delete: require("./delete")(Member),
	getByGuildAndUserId: require("./getByGuildAndUserId")(Member),
	getByGuildIdAndName: require("./getByGuildIdAndName")(Member),
	getByGuildIdAndDiscrim: require("./getByGuildIdAndDiscrim")(Member),
	getByGuildIdNameAndDiscrim: require("./getByGuildIdNameAndDiscrim")(Member)
});
