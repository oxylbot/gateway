module.exports = User => async user =>
	await User.upsert(user);
