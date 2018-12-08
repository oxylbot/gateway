module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS users (" +
		"id text PRIMARY KEY, " +
		"username text, " +
		"discriminator text, " +
		"avatar text, " +
		"bot boolean, " +
		"created_at timestamp, " +
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON users (username)");
	await client.execute("CREATE INDEX IF NOT EXISTS ON users (discriminator)");

	return async users => {
		if(!Array.isArray(users)) users = [users];
		const queries = [];

		for(const user of users) {
			queries.push({
				query: "INSERT INTO users " +
					"(id, username, discriminator, avatar, bot, created_at) " +
					"VALUES (?, ?, ?, ?, ?, ?);",
				params: [user.id, user.username, user.discriminator, user.avatar || "", user.bot, user.createdAt]
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
