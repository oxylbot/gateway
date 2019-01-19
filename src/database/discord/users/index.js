module.exports = async User => ({
	cache: await require("./cache.js")(User),
	getByID: await require("./getById")(User),
	getByName: await require("./getByName")(User),
	getByDiscrim: await require("./getByDiscrim")(User),
	getByNameAndDiscrim: await require("./getByNameAndDiscrim")(User)
});
