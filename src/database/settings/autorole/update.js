module.exports = AutoRole => async (guildId, roles) =>
	await AutoRole.upsert({
		guildId,
		roles
	});

