module.exports = async client => ({
	cache: await require("./cache")(client)
});
