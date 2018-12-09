const users = require("../users/index");

module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS members (" +
		"guild_id text, " +
		"id text, " +
		"nickname text, " +
		"roles set<text>, " +
		"joined_at timestamp, " +
		"PRIMARY KEY (guild_id, id)" +
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON members (nickname)");

	const { cache: cacheUsers } = await users(client);

	return async members => {
		if(!Array.isArray(members)) members = [members];
		const queries = [];

		for(const member of members) {
			queries.push({
				query: "INSERT INTO members " +
					"(guild_id, id, nickname, roles, joined_at) " +
					"VALUES (?, ?, ?, ?, ?);",
				params: [member.guildID, member.id, member.nickname, member.roles, member.joinedAt]
			});
		}

		await cacheUsers(members.map(member => member.user));
		if(queries.length === 1) {
			const [{ query, params }] = queries;
			return await client.execute(query, params, { prepare: true });
		} else {
			return await client.batch(queries, { prepare: true });
		}
	};
};
