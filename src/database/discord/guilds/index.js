module.exports = async client => ({
	cache: await require("./cache")(client),
	getByID: await require("./getByID")(client)
});
