const convert = require("./dbObjectConverter");

module.exports = async client => async guildID => {
	const query = "SELECT * FROM roles WHERE guild_id = ?;";

	const { rows } = await client.execute(query,
		[guildID],
		{ prepare: true });

	return rows.map(convert);
};
