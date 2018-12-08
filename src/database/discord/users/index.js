module.exports = async client => ({
	cache: await require("./cache")(client),
	findByID: await require("./id")(client),
	findByName: await require("./name")(client),
	findByDiscriminator: await require("./discriminator")(client),
	findByTag: await require("./tag")(client)
});
