module.exports = Prefix => ({
	update: require("./update")(Prefix),
	get: require("./get")(Prefix)
});
