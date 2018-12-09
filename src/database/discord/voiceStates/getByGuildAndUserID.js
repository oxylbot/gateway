module.exports = async client => async (guildID, userID) => {
	const query = "SELECT * FROM voice_states WHERE guild_id = ? AND user_id = ?;";

	const { rows: [voiceState] } = await client.execute(query,
		[guildID, userID],
		{ prepare: true });

	return voiceState;
};
