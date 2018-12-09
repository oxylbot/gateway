module.exports = async client => async (guildID, userID) => {
	const query = "DELETE FROM voice_states WHERE guild_id = ? AND user_id = ?;";

	return await client.execute(query,
		[guildID, userID],
		{ prepare: true });
};
