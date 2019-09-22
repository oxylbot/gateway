module.exports = Music => ({
	update: require("./update")(Music),
	get: require("./get")(Music)
});
