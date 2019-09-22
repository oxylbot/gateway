module.exports = RoleMe => async (guildId, roles) =>
	await RoleMe.upsert({
		guildId,
		roles
	});

