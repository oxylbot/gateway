module.exports = async database => ({
	cache: await require("./delete.js")(database),
	getByID: await require("./getByID.js")(database),
	delete: await require("./delete.js")(database)
});
