module.exports = async client => async (username, discriminator) => {
	const query = "SELECT * FROM users WHERE username = ? AND discriminator = ?;";

	const { rows: [user] } = await client.execute(query,
		[username, discriminator],
		{ prepare: true });

	return user;
};
