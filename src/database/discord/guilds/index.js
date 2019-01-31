module.exports = Guild => ({
	cache: require("./delete.js")(Guild),
	getByID: require("./getById.js")(Guild),
	delete: require("./delete.js")(Guild)
});
