module.exports = async client => async id => {
	const query = "DELETE FROM roles WHERE id = ?;";

	return await client.execute(query,
		[id],
		{ prepare: true });
};
