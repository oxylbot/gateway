module.exports = Role => async id =>
	await Role.destroy({ where: { id } });
