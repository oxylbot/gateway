module.exports = Permissions => async roleId =>
	await Permissions.findByPk(roleId);
