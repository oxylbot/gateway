const convert = require("./dbObjectConverter");

module.exports = async client => async id => {
	const query = "SELECT * FROM roles WHERE id = ?;";

	const { rows: [role] } = await client.execute(query,
		[id],
		{ prepare: true });

	return convert(role);
};
