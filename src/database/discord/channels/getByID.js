const convert = require("./dbObjectConverter");

module.exports = async client => async id => {
	const query = "SELECT * FROM channels WHERE id = ?;";

	const { rows: [channel] } = await client.execute(query,
		[id],
		{ prepare: true });

	return convert(channel);
};
