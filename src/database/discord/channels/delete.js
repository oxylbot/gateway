module.exports = async client => async id => {
	const query = "DELETE FROM channels WHERE id = ?;";

	return await client.execute(query,
		[id],
		{ prepare: true });
};
