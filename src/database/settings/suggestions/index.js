module.exports = Suggestions => ({
	update: require("./update")(Suggestions),
	get: require("./get")(Suggestions)
});
