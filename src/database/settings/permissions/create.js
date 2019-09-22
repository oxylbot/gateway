module.exports = Permissions => async permission =>
	await Permissions.create(permission);
