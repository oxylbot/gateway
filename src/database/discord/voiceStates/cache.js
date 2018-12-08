module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS voice_states (" +
		"user_id text, " +
		"guild_id text, " +
		"channel_id text, " +
		"deaf boolean, " +
		"mute boolean, " +
		"self_deaf boolean, " +
		"self_mute boolean, " +
		"PRIMARY KEY (guild_id, user_id)" +
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON voice_states (channel_id)");

	return async voiceStates => {
		if(!Array.isArray(voiceStates)) voiceStates = [voiceStates];
		const queries = [];

		for(const voiceState of voiceStates) {
			queries.push({
				query: "INSERT INTO voice_states " +
					"(user_id, guild_id, channel_id, deaf, mute, self_deaf, self_mute) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?);",
				params: [voiceState.userID, voiceState.guildID, voiceState.channelID,
					voiceState.deaf, voiceState.mute, voiceState.selfDeaf, voiceState.selfMute]
			});
		}

		if(queries.length === 1) {
			const [{ query, params }] = queries;
			return await client.execute(query, params, { prepare: true });
		} else {
			return await client.batch(queries, { prepare: true });
		}
	};
};
