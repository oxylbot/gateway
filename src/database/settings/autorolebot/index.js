module.exports = AutoRoleBot => ({
	update: require("./update")(AutoRoleBot),
	get: require("./get")(AutoRoleBot)
});
