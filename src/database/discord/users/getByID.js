module.exports = async client => async id => {
	const query = "SELECT * FROM users WHERE id = ?;";

	return await client.execute(query,
		[id],
		{ prepare: true });
};
