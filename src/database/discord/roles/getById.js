module.exports = Role => async id =>
	await Role.findByPk(id);
