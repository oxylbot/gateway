module.exports = Guild => ({
	cache: require("./cache")(Guild),
	getById: require("./getById")(Guild),
	delete: require("./delete")(Guild)
});
