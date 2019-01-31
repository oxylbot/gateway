module.exports = User => async users =>
	await Promise.all(users.map(user => User.upsert(user)));
