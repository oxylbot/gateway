module.exports = Guild => ({
	cache: require("./delete")(Guild),
	getById: require("./getById")(Guild),
	delete: require("./delete")(Guild)
});
