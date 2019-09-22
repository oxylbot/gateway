module.exports = AutoRole => ({
	update: require("./update")(AutoRole),
	get: require("./get")(AutoRole)
});
