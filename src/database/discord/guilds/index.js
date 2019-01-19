module.exports = async Guild => ({
	cache: await require("./delete.js")(Guild),
	getByID: await require("./getByID.js")(Guild),
	delete: await require("./delete.js")(Guild)
});
