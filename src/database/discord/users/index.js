module.exports = async client => ({
	cache: await require("./cache")(client),
	getByID: await require("./getByID")(client),
	getByName: await require("./getByName")(client),
	getByDiscriminator: await require("./getByDiscriminator")(client),
	getByUsernameAndDiscriminator: await require("./getByUsernameAndDiscriminator")(client)
});
