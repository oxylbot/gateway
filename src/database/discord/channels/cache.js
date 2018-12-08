module.exports = async client => {
	await client.execute("CREATE TYPE IF NOT EXISTS overwrite (" +
		"id text, " +
		"type text, " +
		"allow bigint, " +
		"deny bigint" +
	");");

	await client.execute("CREATE TABLE IF NOT EXISTS channels (" +
		"id text PRIMARY KEY, " +
		"guild_id text, " +
		"name text, " +
		"nsfw boolean, " +
		"type tinyint, " +
		"position smallint, " +
		"overwrites set<frozen<overwrite>>," +
		"parent_id text, " +
		"user_limit tinyint" +
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON channels (guild_id)");
	await client.execute("CREATE INDEX IF NOT EXISTS ON channels (name)");
	await client.execute("CREATE INDEX IF NOT EXISTS ON channels (type)");

	return async channels => {
		if(!Array.isArray(channels)) channels = [channels];
		const queries = [];

		for(const channel of channels) {
			queries.push({
				query: "INSERT INTO channels " +
					"(id, guild_id, name, nsfw, type, position, overwrites, parent_id, user_limit) " +
					"VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
				params: [channel.id, channel.guildID, channel.name, !!channel.nsfw, channel.type, channel.position,
					channel.overwrites, channel.parentID || "", channel.user_limit || 0]
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
