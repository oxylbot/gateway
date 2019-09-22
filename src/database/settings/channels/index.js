module.exports = Channels => ({
	update: require("./update")(Channels),
	get: require("./get")(Channels)
});
