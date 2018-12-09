module.exports = async client => async username => {
	const query = "SELECT * FROM users WHERE username = ?;";

	const { rows } = await client.execute(query,
		[username],
		{ prepare: true });

	return rows;
};
