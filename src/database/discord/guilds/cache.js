module.exports = Guild => async guild =>
	await Guild.upsert(guild);
