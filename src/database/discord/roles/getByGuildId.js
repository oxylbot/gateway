module.exports = Role => async guildId =>
	await Role.findAll({
		where: {
			guildId
		}
	});
