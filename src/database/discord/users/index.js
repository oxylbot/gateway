module.exports = User => ({
	cache: require("./cache.js")(User),
	getById: require("./getById")(User),
	getByName: require("./getByName")(User),
	getByDiscrim: require("./getByDiscrim")(User),
	getByNameAndDiscrim: require("./getByNameAndDiscrim")(User)
});
