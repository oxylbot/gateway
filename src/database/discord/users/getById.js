module.exports = User => async id =>
	await User.findByPk(id);
