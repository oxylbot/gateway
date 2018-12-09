module.exports = async client => async id => {
	const query = "SELECT * FROM users WHERE id = ?;";

	const { rows: [user] } = await client.execute(query,
		[id],
		{ prepare: true });

	return user;
};
