module.exports = Permissisons => async (roleId, permission) =>
	await Permissisons.update(permission, { where: { roleId } });

