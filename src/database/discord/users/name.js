module.exports = async client => async username => {
	const query = "SELECT * FROM users WHERE username = ?;";

	return await client.execute(query,
		[username],
		{ prepare: true });
};
