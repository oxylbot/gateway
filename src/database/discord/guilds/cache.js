module.exports = Guild => async guilds =>
	await Promise.all(guilds.map(guild => Guild.upsert(guild)));
