module.exports = Guild => ({
	cache: require("./delete.js")(Guild),
	getById: require("./getById.js")(Guild),
	delete: require("./delete.js")(Guild)
});
