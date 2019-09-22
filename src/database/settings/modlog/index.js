module.exports = ModLog => ({
	update: require("./update")(ModLog),
	get: require("./get")(ModLog)
});
