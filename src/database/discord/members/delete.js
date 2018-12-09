module.exports = async client => async (guildID, userID) => {
	const query = "DELETE FROM members WHERE guild_id = ? AND id = ?;";

	return await client.execute(query,
		[guildID, userID],
		{ prepare: true });
};
