module.exports = async database => ({
	cache: await require("./cache.js")(database),
	getByID: await require("./getById")(database),
	getByName: await require("./getByName")(database),
	getByDiscrim: await require("./getByDiscrim")(database),
	getByNameAndDiscrim: await require("./getByNameAndDiscrim")(database)
});
