module.exports = async Channel => ({
	cache: require("./cache.js")(Channel),
	getByGuildID: require("./getByGuildID.js")(Channel),
	getById: require("./getByID.js")(Channel),
	delete: require("./delete.js")(Channel)
});
