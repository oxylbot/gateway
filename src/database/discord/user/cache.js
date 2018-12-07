module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS users (" +
		"id text PRIMARY KEY," +
		"username text," +
		"discriminator text," +
		"avatar text," +
		"bot boolean",
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON users (username)");
	await client.execute("CREATE INDEX IF NOT EXISTS ON users (discriminator)");

	return async user => {
		const query = "INSERT INTO users " +
			"(id, username, discriminator, avatar, bot) " +
			"VALUES (?, ?, ?, ?, ?);";

		return await client.execute(query,
			[user.id, user.username, user.discriminator, user.avatar, user.bot],
			{ prepare: true });
	};
};
