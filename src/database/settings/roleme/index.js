module.exports = RoleMe => ({
	update: require("./update")(RoleMe),
	get: require("./get")(RoleMe)
});
