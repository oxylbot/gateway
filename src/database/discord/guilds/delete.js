module.exports = async client => async id => {
	const queries = [{
		query: "DELETE FROM guilds WHERE id = ?;",
		params: [id]
	}, {
		query: "DELETE FROM members WHERE guild_id = ?;",
		params: [id]
	}, {
		query: "DELETE FROM channels WHERE guild_id = ?;",
		params: [id]
	}, {
		query: "DELETE FROM voice_states WHERE guild_id = ?;",
		params: [id]
	}, {
		query: "DELETE FROM roles WHERE guild_id = ?;",
		params: [id]
	}];

	return await client.batch(queries, { prepare: true });
};
