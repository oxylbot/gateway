module.exports = Censor => ({
	create: require("./create")(Censor),
	delete: require("./delete")(Censor),
	getByGuildId: require("./getByGuildId")(Censor),
	getById: require("./getById")(Censor),
	update: require("./update")(Censor)
});
