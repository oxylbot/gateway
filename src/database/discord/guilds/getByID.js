module.exports = async client => async id => {
	const query = "SELECT * FROM guilds WHERE id = ?;";

	const { rows: [guild] } = await client.execute(query,
		[id],
		{ prepare: true });

	return guild;
};
