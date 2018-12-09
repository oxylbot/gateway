module.exports = async client => async channelID => {
	const query = "SELECT * FROM voice_states WHERE channel_id = ?;";

	const { rows } = await client.execute(query,
		[channelID],
		{ prepare: true });

	return rows;
};
