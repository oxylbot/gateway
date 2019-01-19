module.exports = async Channel => ({
	cache: await require("./cache.js")(Channel),
	getByGuildID: await require("./getByGuildID.js")(Channel),
	getById: await require("./getByID.js")(Channel),
	delete: await require("./delete.js")(Channel)
});
