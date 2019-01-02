module.exports = async database => ({
	cache: await require("./delete.js")(database),
	getById: await require("./getByID.js")(database),
	delete: await require("./delete.js")(database)
});
