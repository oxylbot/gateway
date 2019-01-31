module.exports = Role => async roles =>
	await Promise.all(roles.map(role => Role.upsert(role)));
