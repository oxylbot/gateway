module.exports = async client => async (guildID, userID) => {
	const query = "SELECT * FROM members WHERE guild_id = ? AND id = ?;";

	const { rows: [member] } = await client.execute(query,
		[guildID, userID],
		{ prepare: true });

	return member;
};
