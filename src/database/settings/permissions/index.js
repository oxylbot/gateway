module.exports = Permissions => ({
	create: require("./create")(Permissions),
	delete: require("./delete")(Permissions),
	getByGuildId: require("./getByGuildId")(Permissions),
	getByRoleId: require("./getByRoleId")(Permissions),
	update: require("./update")(Permissions)
});
