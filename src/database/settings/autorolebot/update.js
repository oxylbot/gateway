module.exports = AutoRoleBot => async (guildId, roles) =>
	await AutoRoleBot.upsert({
		guildId,
		roles
	});

