module.exports = Permissions => async id =>
	await Permissions.destroy({ where: { roleId: id } });
