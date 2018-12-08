module.exports = async client => {
	await client.execute("CREATE TABLE IF NOT EXISTS roles (" +
		"id text PRIMARY KEY, " +
		"guild_id text, " +
		"name text, " +
		"color int, " +
		"position smallint, " +
		"permissions bigint" +
	");");

	await client.execute("CREATE INDEX IF NOT EXISTS ON roles (guild_id)");
	await client.execute("CREATE INDEX IF NOT EXISTS ON roles (name)");

	return async roles => {
		if(!Array.isArray(roles)) roles = [roles];
		const queries = [];

		for(const role of roles) {
			queries.push({
				query: "INSERT INTO roles " +
					"(id, guild_id, name, color, position, permissions) " +
					"VALUES (?, ?, ?, ?, ?, ?);",
				params: [role.id, role.guildID, role.name, role.color, role.position, role.permissions]
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
