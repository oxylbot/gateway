module.exports = async client => async id => {
	const query = "SELECT * FROM guilds WHERE id = ?;";

	return await client.execute(query,
		[id],
		{ prepare: true });
};
