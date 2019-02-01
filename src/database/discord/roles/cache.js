module.exports = Role => async role =>
	await Role.upsert(role);
