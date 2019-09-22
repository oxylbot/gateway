module.exports = UserLog => ({
	update: require("./update")(UserLog),
	get: require("./get")(UserLog)
});
