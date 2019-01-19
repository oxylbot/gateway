module.exports = async Role => ({
	cache: await require("./cache.js")(Role),
	delete: await require("./delete.js")(Role),
	getByID: await require("./getById.js")(Role),
	getByGuildID: await require("./getByGuildId")(Role)
});
